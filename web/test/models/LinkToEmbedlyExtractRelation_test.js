(function() {
	/**/
	"use strict";

	var db = require('../../src/db');
	var LinkModel = require('../../src/models/Link').compileModel();
	var EmbedlyExtractModel = require('../../src/models/EmbedlyExtract').compileModel();
	var embedlyId;


	exports.start = function(test) {
		db.connect(function() {
			LinkModel.remove({}, function(err) {
				if( err ) { throw err; }
				EmbedlyExtractModel.remove({}, function(err) {
					if( err ) { throw err; }
					test.done();
				});
			});
		});
	};

	exports.test_createEmbedlyDocument = function(test) {
		EmbedlyExtractModel.create({
		"provider_url": "http://www.ua.pt", "description": "Para que esta p\u00e1gina funcione corretamente deve ativar a execu\u00e7\u00e3o de scripts. Se tal n\u00e3o for poss\u00edvel, algumas funcionalidades poder\u00e3o estar limitadas. Nesse caso sugere-se a navega\u00e7\u00e3o pelo mapa do s\u00edtio.", "safe": true, "provider_display": "www.ua.pt", "related": [{"score": 0.6283628940582275, "description": "Writing shell scripts can be rather daunting, primarily because the shell isn't the most friendly of languages to use. However, I hope to show you in this tutorial that shell scripting is actually not as tough or as scary as you might expect.", "title": "Writing a Shell Script From Scratch | Nettuts+", "url": "http://net.tutsplus.com/tutorials/tools-and-tips/writing-a-shell-script-from-scratch/", "thumbnail_height": 200, "thumbnail_url": "http://cdn.tutsplus.com/net.tutsplus.com/authors/jeffreyway/command-200.jpg", "thumbnail_width": 200}, {"score": 0.541569173336029, "description": "\"Iron Man 3\" has already amassed more than $300 million worldwide and is on target to become the highest grossing opening weekend in the United States ever (outdoing even last summer's \"The Avengers\").", "title": "5 Scripts That Made Shane Black Hollywood's Hottest Writer In The 1990s", "url": "http://blogs.indiewire.com/theplaylist/when-he-was-king-the-5-scripts-that-made-shane-black-hollywood-hottest-writer-in-the-1990s-20130503", "thumbnail_height": 478, "thumbnail_url": "http://d1oi7t5trwfj5d.cloudfront.net/c6/35/d4ef6d9544b6bb8059fd36af87a6/iron-man-3-set-photo-shane-black.jpg", "thumbnail_width": 680}], "favicon_url": "http://www.ua.pt/images/ua.ico", "authors": [], "images": [{"url": "http://banners.ua.pt/Banners/banner_7_52_4.jpg", "width": 240, "size": 7382, "caption": null, "height": 160}, {"caption": null, "url": "http://banners.ua.pt/Banners/banner_7_52_1.jpg", "height": 160, "width": 240, "colors": [{"color": [124, 66, 56], "weight": 0.58203125}, {"color": [32, 38, 44], "weight": 0.288330078125}, {"color": [122, 132, 139], "weight": 0.074951171875}, {"color": [181, 187, 187], "weight": 0.0546875}], "entropy": 5.274656373504777, "size": 7005}, {"caption": null, "url": "http://banners.ua.pt/Banners/banner_7_52_2.jpg", "height": 160, "width": 240, "colors": [{"color": [122, 68, 60], "weight": 0.642578125}, {"color": [37, 49, 62], "weight": 0.235595703125}, {"color": [133, 138, 143], "weight": 0.054443359375}, {"color": [181, 185, 182], "weight": 0.053955078125}, {"color": [236, 244, 248], "weight": 0.013427734375}], "entropy": 5.346514386536402, "size": 6820}, {"caption": null, "url": "http://banners.ua.pt/Banners/banner_7_52_3.jpg", "height": 160, "width": 240, "colors": [{"color": [119, 68, 61], "weight": 0.619384765625}, {"color": [23, 28, 36], "weight": 0.118408203125}, {"color": [41, 61, 80], "weight": 0.112548828125}, {"color": [186, 185, 177], "weight": 0.0810546875}, {"color": [119, 130, 139], "weight": 0.068603515625}], "entropy": 5.324941292544316, "size": 6838}, {"caption": null, "url": "http://uaonline.ua.pt/upload/img/joua_i_999_full.jpg", "height": 155, "width": 233, "colors": [{"color": [206, 212, 206], "weight": 0.56396484375}, {"color": [170, 148, 146], "weight": 0.18408203125}, {"color": [24, 24, 21], "weight": 0.123046875}, {"color": [81, 69, 50], "weight": 0.068603515625}, {"color": [121, 100, 98], "weight": 0.060302734375}], "entropy": 5.429747784286084, "size": 22937}], "cache_age": 64103, "lead": null, "language": "Portuguese", "original_url": "http://www.ua.pt", "url": "http://www.ua.pt", "media": {}, "title": "Universidade de Aveiro \u203a P\u00e1gina inicial", "offset": null, "content": "<div>\n<p>Para que esta p&#225;gina funcione corretamente deve ativar a execu&#231;&#227;o de scripts. Se tal n&#227;o for poss&#237;vel, algumas funcionalidades poder&#227;o estar limitadas. Nesse caso sugere-se a navega&#231;&#227;o pelo <a href=\"http://www.ua.pt/sitemap.aspx\">mapa do s&#237;tio</a>.</p>\n</div>", "entities": [{"count": 1, "name": "Nesse"}], "keywords": [{"score": 10, "name": "corretamente"}, {"score": 10, "name": "mapa"}, {"score": 10, "name": "funcione"}, {"score": 10, "name": "deve"}, {"score": 10, "name": "caso"}, {"score": 10, "name": "poder"}, {"score": 10, "name": "ativar"}, {"score": 10, "name": "navega"}, {"score": 10, "name": "algumas"}, {"score": 10, "name": "sugere-se"}], "published": null, "provider_name": "Ua", "type": "html"
		}, function (err, embed) {
			if( err ) { throw err; }
			test.ok(embed, 'embed document properly saved');
			test.ok(embed._id, 'embed document has an _id');
			embedlyId = embed._id;
			test.done();
		})
	};

//	exports.test_findsEmbedModelViaLinkProperty = function(test) {
//		LinkModel
//			.findOne({ 'url': 'http://www.ua.pt' })
//			.populate( '_embedlyExtract' )
//			.exec(function(err, link) {
//				if( err ) { throw err; }
//				test.equals(link._embedlyExtract.provider_url, 'http://www.ua.pt', 'link finds embedly via embedlyId reference');
//				test.done();
//			});
//	};

	exports.end = function(test) {
		LinkModel.remove({}, function(err) {
			if( err ) { throw err; }
			EmbedlyExtractModel.remove({}, function(err) {
				if( err ) { throw err; }
				db.disconnect(test.done);
			});
		});
	};

} ());