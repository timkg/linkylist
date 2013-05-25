(function () {
	/**/
	"use strict";

	var webshot = require('webshot');
	var streamBuffer = require('stream-buffers');
	var knox = require('knox');
	var client = undefined;

	var S3_URL = 'http://linkylist.s3.amazonaws.com/';

	exports.configureClient = function() {
		client = knox.createClient({
			key: process.env.S3_ACCESS_KEY_ID
			, secret: process.env.S3_SECRET_ACCESS_KEY
			, bucket: process.env.S3_BUCKET_NAME
		});
	};

	exports.get = function(url, id, fn) {
		if (!client) {
			exports.configureClient();
		}
		var callback = fn || function(){}
			, fileName = id.toString()+'.png';

		webshot(url, function(err, stream) {
			if (err) { console.log(err); }
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
				})
				req.end(imageBuffer.getContents());
			})
		});
	};


}());