(function () {
	/**/
	"use strict";

	// uncomment one
	// -------------
	// var CDN = 'S3';
	var CDN = 'Cloudinary';

	var webshot = require('webshot');

	// lazy-loading dependencies
	// -------------------------
	// knox:
	var knox;
	var streamBuffer;
	var client;
	var S3_URL;
	// cloudinary:
	var cloudinary;


	exports.get = function(url, id, callback) {
		var options = {
			screenSize: {
				width: 800
				, height: 600
			}
		};
		webshot(url, options, function(err, stream) {
			if (err) { console.log(err); }

			if (CDN === 'S3') {
				exports.sendImageStreamToS3(stream, id, callback);
			} else if (CDN === 'Cloudinary') {
				exports.sendImageStreamToCloudinary(stream, id, callback);
			}
		});
	};

	exports.sendImageStreamToCloudinary = function(imageStream, id, callback) {
		if (!cloudinary) {
			exports.configureCloudinaryClient();
		}
		var uploadStream = cloudinary.uploader.upload_stream(callback, {public_id: id});
		imageStream.on('data', uploadStream.write);
		imageStream.on('end', uploadStream.end);
	};

	exports.sendImageStreamToS3 = function(stream, id, callback) {
		if (!client) {
			exports.configureKnoxClient();
		}

		var fileName = id.toString()+'.png';

		// save incoming stream into buffer to calculate size, which is required by S3
		// ---------------------------------------------------------------------------
		var imageBuffer = new streamBuffer.WritableStreamBuffer({
			initialSize: (100 * 1024) // start as 100 kilobytes.
			, incrementAmount: (10 * 1024) // grow by 10 kilobytes each time buffer overflows
		});
		stream.on('data', function(chunk) {
			imageBuffer.write(chunk);
		});
		stream.on('end', function() {
			var headers = {
				'Content-Length': imageBuffer.size()
				, 'Content-Type': 'image/png'
			};
			var req = client.put(fileName, headers);
			req.on('response', function(res) {
				if (res.statusCode === 200) { console.log(fileName + ' success'); }
				callback(S3_URL + fileName);
			});
			req.end(imageBuffer.getContents());
		});
	};

	exports.configureCloudinaryClient = function() {
		cloudinary = require('cloudinary');
		cloudinary.config('cloud_name', process.env.CLOUDINARY_CLOUD_NAME);
		cloudinary.config('api_key', process.env.CLOUDINARY_API_KEY);
		cloudinary.config('api_secret', process.env.CLOUDINARY_API_SECRET);
	};

	exports.configureKnoxClient = function() {
		knox = require('knox');
		streamBuffer = require('stream-buffers');
		S3_URL = 'http://linkylist.s3.amazonaws.com/';

		client = knox.createClient({
			key: process.env.S3_ACCESS_KEY_ID
			, secret: process.env.S3_SECRET_ACCESS_KEY
			, bucket: process.env.S3_BUCKET_NAME
		});
	};

}());