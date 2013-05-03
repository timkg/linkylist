(function() {
	/**/
	"use strict";

	var db = require('../../src/db');
	var EmbedlyModel = require('../../src/models/Embedly');
	var Embedly; // inited in compilesModelFromSchema()

	exports.start = function(test) {
		db.connect(test.done);
	};

	exports.test_compilesModelFromSchema = function(test) {
		Embedly = EmbedlyModel.initEmbedlyModel();
		test.ok(Embedly, 'compiled Embedly model');
		test.done();
	};

	exports.test_createsEmbedlyInstances = function(test) {
		var emb = new Embedly({
			"provider_url":"http://www.aplitrak.com", "description":"A hot content driven London based agency are on the lookour for a capable and ambitious new front end developer to join their fast growing team - taking the reigns on a range of brand new and existing projects for some of the countrys favourite entertainment entities!", "title":"London - up to \u00a340k - Front End Developer / HTML5 / CSS3", "url":"http://www.aplitrak.com/?adid=Y2FtZXJvbmMuNzE0NDUudHdpQGV4cGxvcmVyZWMuYXBsaXRyYWsuY29t", "thumbnail_width":48, "thumbnail_url":"http://www.aplitrak.com/twitter/twitter_logo_normal.jpg", "version":"1.0", "provider_name":"Aplitrak", "type":"link", "thumbnail_height":48
		});
		test.ok(emb, 'created an Embedly instance');
		test.done();
	};

	exports.test_savesInstancesToDb = function(test) {
		var emb = new Embedly({
			"provider_url":"http://www.aplitrak.com", "description":"A hot content driven London based agency are on the lookour for a capable and ambitious new front end developer to join their fast growing team - taking the reigns on a range of brand new and existing projects for some of the countrys favourite entertainment entities!", "title":"London - up to \u00a340k - Front End Developer / HTML5 / CSS3", "url":"http://www.aplitrak.com/?adid=Y2FtZXJvbmMuNzE0NDUudHdpQGV4cGxvcmVyZWMuYXBsaXRyYWsuY29t", "thumbnail_width":48, "thumbnail_url":"http://www.aplitrak.com/twitter/twitter_logo_normal.jpg", "version":"1.0", "provider_name":"Aplitrak", "type":"link", "thumbnail_height":48
		});
		emb.save(function(err, result) {
			if( err ) { throw err; }
			test.equals(result.provider_url, 'http://www.aplitrak.com', 'created an embedly instance');
			test.done();
		});
	};

	exports.test_findsEmbedliesByUrl = function(test) {
		Embedly.find({ url: 'http://www.aplitrak.com/?adid=Y2FtZXJvbmMuNzE0NDUudHdpQGV4cGxvcmVyZWMuYXBsaXRyYWsuY29t' }, function(err, results) {
			if( err ) { throw err; }
			test.equals(results.length, 1, 'found a link');
			test.done();
		});
	};

	exports.end = function(test) {
		Embedly.remove({url: 'http://www.aplitrak.com/?adid=Y2FtZXJvbmMuNzE0NDUudHdpQGV4cGxvcmVyZWMuYXBsaXRyYWsuY29t'}, function(err) {
			if( err ) { throw err; }
			db.disconnect(test.done);
		});
	};

}());



//exports._saveDummyData = function (callback) {
//	var data = [
//
//		{"provider_url":"http://www.aplitrak.com", "description":"The successful UI developer will be working on a fantastic offering of interesting projects, technology solutions, user centric development approaches with a bonus of working alongside a skilled team. The successful UI developer will have a solid commercial experience with HTML5 and CSS3. Alongside this, experience of UI development on mobile platforms is a massive plus!", "title":"London - Up to \u00a330k - UI Developer / HTML5 / CSS3 / Javascript", "url":"http://www.aplitrak.com/?adid=Y2FtZXJvbmMuNTMyNDUudHdpQGV4cGxvcmVyZWMuYXBsaXRyYWsuY29t", "thumbnail_width":48, "thumbnail_url":"http://www.aplitrak.com/twitter/twitter_logo_normal.jpg", "version":"1.0", "provider_name":"Aplitrak", "type":"link", "thumbnail_height":48},
//		{"provider_url":"http://www.inwebson.com", "description":"The truth is, we can still creating those fancy headings, cool fonts and text effects without using Photoshop, but just with CSS. In this article, I have listed some useful CSS tricks and techniques which can be used to style your headings, fonts and text as well as content.", "title":"CSS Tricks for Headings, Fonts and Text Styling", "mean_alpha":171.56875, "author_name":"Kenny", "thumbnail_width":180, "url":"http://www.inwebson.com/css3/css-tricks-for-headings-fonts-and-text-styling/", "thumbnail_url":"http://www.inwebson.com/wp-content/uploads/2012/03/css-tricks-fi.png", "author_url":"http://www.inwebson.com", "version":"1.0", "provider_name":"Inwebson", "type":"link", "thumbnail_height":160},
//		{"provider_url":"http://lea.verou.me", "description":"Is the number of gradients and color stops worth the effect? The whole point of those patterns is to make page loading faster by reducing file size and HTTP requests without the unreadable gibberish that data URIs add in our stylesheets.", "title":"CSS3 Patterns Gallery", "url":"http://lea.verou.me/css3patterns/", "version":"1.0", "provider_name":"Verou", "type":"link"},
//		{"provider_url":"http://www.tempees.com", "version":"1.0", "title":"Tempees.com", "url":"http://www.tempees.com/", "thumbnail_width":302, "thumbnail_url":"http://www.tempees.com/sites/default/files/styles/thumbnail/public/fullslider.jpg", "provider_name":"Tempees", "type":"link", "thumbnail_height":203},
//		{"provider_url":"http://www.tempees.com", "description":"Simple solution of dropdown menu. Without javascript - only CSS3. Compatible with all new browsers (Chrome, Mozilla Firefox, Opera, IE 7+). Click here for demo.", "title":"Clean CSS3 dropdown menu", "thumbnail_width":532, "url":"http://www.tempees.com/free-download/clean-css3-dropdown-menu", "thumbnail_url":"http://www.tempees.com/sites/default/files/simple-css3-dropdown-menu.png", "version":"1.0", "provider_name":"Tempees", "type":"link", "thumbnail_height":357},
//		{"provider_url":"http://www.icondeposit.com", "description":"Here at the Icon Deposit, we give you the opportunity to post your icons, designs, code, and screenshots to promote your work and gain new clients. We feature Hundreds of Free PSD's, Icons, Icon Sets, UI/UX design, Illustrator/Vector graphics, CSS, CSS3, JQuery, Photoshop tutorials and tons more.", "title":"Icon Deposit CSS3 UI Kit (PSD+CSS) - Icon Deposit", "url":"http://www.icondeposit.com/design:100", "thumbnail_width":590, "thumbnail_url":"http://www.icondeposit.com/local--files/imageid:277/Search-UI-ID-Preview.jpg", "version":"1.0", "provider_name":"Icondeposit", "type":"link", "thumbnail_height":444},
//		{"provider_url":"http://css3ps.com", "description":"CSS3Ps is a free, cloud based, photoshop plugin for converting layers to CSS3 styles.", "title":"CSS3Ps - free cloud based photoshop plugin that converts layers to CSS3 styles.", "url":"http://css3ps.com", "thumbnail_width":480, "thumbnail_url":"http://i3.ytimg.com/vi/bwVL6zMauxc/hqdefault.jpg", "version":"1.0", "provider_name":"Css3ps", "type":"link", "thumbnail_height":360},
//		{"provider_url":"http://addigital.com.mx", "description":"En Adobe est\u00e1n haciendo bien las cosas, lentamente parecen ir abandonando la idea sobre la vigencia de Flash y comienzan a hacer cosas realmente interesantes utilizando tecnolog\u00edas como HTML5 y CSS3. Un buen ejemplo de ello es el sitio web The Expressive Web, en donde se explotan las virtudes y mejoras tanto de las propiedades CSS3, como de las mejoras provistas por HTML5.", "title":"Incre\u00edbles efectos y animaciones con HTML5 y CSS3 - addigital", "mean_alpha":0.0, "thumbnail_width":300, "url":"http://addigital.com.mx/increibles-efectos-y-animaciones-con-html5-y-css3/", "thumbnail_url":"http://addigital.com.mx/wp-content/uploads/2012/08/HTML5_Logo_512-300x300.png", "version":"1.0", "provider_name":"Addigital", "type":"link", "thumbnail_height":300},
//		{"provider_url":"http://webdesign.tutsplus.com", "description":"Today I'm going to show you a Photoshop plugin which aims to greatly improve your workflow. It's called CSS Hat and it turns your Photoshop layers directly into valid CSS3. Sponsored Content This is a sponsored review or giveaway of a product/service that's particularly relevant to our readers.", "title":"Magically Turn Your Photoshop Layers Into CSS3 With CSS Hat | Webdesigntuts+", "url":"http://webdesign.tutsplus.com/tutorials/applications/magically-turn-your-photoshop-layers-into-css3-with-css-hat/", "author_name":"Adi Purdila", "thumbnail_width":600, "thumbnail_url":"http://cdn.tutsplus.com/webdesign.tutsplus.com/authors/ian-yates/csshat-screenshot-2.jpg", "author_url":"http://webdesign.tutsplus.com/author/adrian/", "version":"1.0", "provider_name":"Tutsplus", "type":"link", "thumbnail_height":685},
//		{"provider_url":"http://fmabc.blog.so-net.ne.jp", "description":"iPhone\u30a2\u30d7\u30ea\u3084Android\u30a2\u30d7\u30ea\u3001WEB\u5236\u4f5c\u306e\u95a2\u9023\u66f8\u7c4d\u306f\u6570\u591a\u304f\u3042\u308a\u307e\u3059\u304c\u3001\u3069\u308c\u3082\u4e00\u9577\u4e00\u77ed\u3067\u666e\u6bb5PC\u30b5\u30a4\u30c8\u3092\u624b\u639b\u3051\u3066\u3044\u308b\u65b9\u306b\u306f\u7269\u8db3\u308a\u306a\u3044\u3053\u3068\u304c\u307b\u3068\u3093\u3069\u3067\u3057\u305f\u3002 \u3053\u3061\u3089\u306e\u66f8\u7c4d\u306f\u3001\u30b9\u30de\u30fc\u30c8\u30d5\u30a9\u30f3\uff08iPhone/Android\uff09\u306e\u6982\u8981\u304b..", "title":"WEB\u5236\u4f5c\u30d5\u30ed\u30fc\u3001\u30ef\u30a4\u30e4\u30fc\u30d5\u30ec\u30fc\u30e0\u306e\u4f5c\u6210\u30c4\u30fc\u30eb\u3001\u6700\u65b0HTML5/CSS3\uff08\u5148\u884c\u5b9f\u88c5\u30d7\u30ed\u30d1\u30c6\u30a3\uff09\u306b\u6e21\u308b\u307e\u3067\u3001\u7c21\u5358\u304b\u3064\u6c17\u4ed8\u304d\u3092\u4e0e\u3048\u3066\u304f\u308c\u308b\u7d20\u6674\u3089\u3057\u3044\u66f8\u7c4d\u3067\u3059\u3002: \u4e00\u4eba\u66ae\u3089\u3057\u7814\u7a76\u3000iPhone\u3068\u795e8\u306e\u3044\u3044\u3068\u3053\u308d", "thumbnail_width":72, "url":"http://fmabc.blog.so-net.ne.jp/2012-01-09-4", "thumbnail_url":"http://blog.so-net.ne.jp/_profile/_24e/fmabc/_m_fmabc.png", "version":"1.0", "provider_name":"So-net", "type":"link", "thumbnail_height":96},
//		{"provider_url":"http://www.bestdesigntuts.com", "description":"One of the latest advancements in the CSS background property is the addition of multiple backgrounds in the new CSS3 specification. The new specification allows multiple background images to be applied to a single element and for each background image to be controlled individually with relation to position, size and repeat.", "title":"Creating Multiple Background Images with CSS3 | Best Design Tutorials", "url":"http://www.bestdesigntuts.com/creating-multiple-background-images-with-css3/", "thumbnail_width":630, "thumbnail_url":"http://www.bestdesigntuts.com/wp-content/uploads/2013/04/rsz_cover.jpg", "version":"1.0", "provider_name":"Bestdesigntuts", "type":"link", "thumbnail_height":300},
//		{"provider_url":"http://suzettefranck.com", "description":"I had the opportunity to give my CSS3 Presentation to about 30 people on Monday in the OCWPWD Meetup at Zeek Interactive. I gave a similar talk at this past 2013 San Diego WordCamp, but ran out of time when it came to the CSS3 Demo.", "title":"OCWP Web Designer's Meetup & Upcoming #wcmia - Suzette Franck", "author_name":"mt_Suzette", "thumbnail_width":460, "url":"http://suzettefranck.com/ocwp-web-designers-meetup-upcoming-wcmia/", "thumbnail_url":"http://suzettefranck.com/wp-content/uploads/ocwpwd-css3-r.jpg", "author_url":"http://suzettefranck.com/author/suzette/", "version":"1.0", "provider_name":"Suzettefranck", "type":"link", "thumbnail_height":126},
//		{"provider_url":"http://msdn.microsoft.com", "description":"Rahul Lalmalani | March 28, 2013 The Mobile Playing Field Today, a large portion of site traffic comes from mobile devices-namely smart phones and tablets-in addition to traditional PCs. Across the globe, mobile devices now account for 12 percent of Internet traffic, and this is scaling up faster than desktop Internet traffic.", "title":"Script Junkie | Why the Web Is Ready for Responsive Web Design", "url":"http://msdn.microsoft.com/en-us/magazine/dn151701.aspx", "thumbnail_width":550, "thumbnail_url":"http://i.msdn.microsoft.com/dn151701.Lalmalani_fig01s(en-us,MSDN.10).png", "version":"1.0", "provider_name":"Microsoft", "type":"link", "thumbnail_height":212},
//		{"provider_url":"http://www.simplyhired.com", "description":"April 03, 2013. View the job posting for Sr. Front End Javascript Developer Html5, Jquery, Css3 at Intake.io in New York, NY. Front End Developer We are a", "title":"Sr. Front End Javascript Developer Html5, Jquery, Css3 job", "url":"http://www.simplyhired.com/job-id/zgrvwtuq2l/sr-front-jobs/", "thumbnail_width":205, "thumbnail_url":"http://www.simplyhired.com/c/sh/images/3c7fde5c54fd6d8b2c7e39555ca07428aa3abad7/simplyhired.gif", "version":"1.0", "provider_name":"Simplyhired", "type":"link", "thumbnail_height":65},
//		{"provider_url":"http://fmabc.blog.so-net.ne.jp", "description":"iPhone\u30a2\u30d7\u30ea\u3084Android\u30a2\u30d7\u30ea\u3001WEB\u5236\u4f5c\u306e\u95a2\u9023\u66f8\u7c4d\u306f\u6570\u591a\u304f\u3042\u308a\u307e\u3059\u304c\u3001\u3069\u308c\u3082\u4e00\u9577\u4e00\u77ed\u3067\u666e\u6bb5PC\u30b5\u30a4\u30c8\u3092\u624b\u639b\u3051\u3066\u3044\u308b\u65b9\u306b\u306f\u7269\u8db3\u308a\u306a\u3044\u3053\u3068\u304c\u307b\u3068\u3093\u3069\u3067\u3057\u305f\u3002 \u3053\u3061\u3089\u306e\u66f8\u7c4d\u306f\u3001\u30b9\u30de\u30fc\u30c8\u30d5\u30a9\u30f3\uff08iPhone/Android\uff09\u306e\u6982\u8981\u304b..", "title":"WEB\u5236\u4f5c\u30d5\u30ed\u30fc\u3001\u30ef\u30a4\u30e4\u30fc\u30d5\u30ec\u30fc\u30e0\u306e\u4f5c\u6210\u30c4\u30fc\u30eb\u3001\u6700\u65b0HTML5/CSS3\uff08\u5148\u884c\u5b9f\u88c5\u30d7\u30ed\u30d1\u30c6\u30a3\uff09\u306b\u6e21\u308b\u307e\u3067\u3001\u7c21\u5358\u304b\u3064\u6c17\u4ed8\u304d\u3092\u4e0e\u3048\u3066\u304f\u308c\u308b\u7d20\u6674\u3089\u3057\u3044\u66f8\u7c4d\u3067\u3059\u3002: \u4e00\u4eba\u66ae\u3089\u3057\u7814\u7a76\u3000iPhone\u3068\u795e8\u306e\u3044\u3044\u3068\u3053\u308d", "thumbnail_width":72, "url":"http://fmabc.blog.so-net.ne.jp/2012-01-09-4", "thumbnail_url":"http://blog.so-net.ne.jp/_profile/_24e/fmabc/_m_fmabc.png", "version":"1.0", "provider_name":"So-net", "type":"link", "thumbnail_height":96}
//	];
//
//	//mongoose Models don't provide batch insert, mongodb collections do
//	// https://groups.google.com/forum/?fromgroups=#!topic/mongoose-orm/IkPmvcd0kds
//	this.Link.collection.insert(data, {}, callback);
//};