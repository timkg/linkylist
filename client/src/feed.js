define([], function() {

	function Feed() {
		// hardcoded test values
		this.items = [{"provider_url": "http://www.codecademy.com", "description": "Codecademy is the easiest way to learn how to code. It's interactive, fun, and you can do it with your friends.", "title": "Getting Started", "url": "http://www.codecademy.com", "thumbnail_width": 297, "thumbnail_url": "http://www.codecademy.com/assets/homepage/community-15aaa124541705cdc7490405a1a4a273.png", "version": "1.0", "provider_name": "Codecademy", "type": "link", "thumbnail_height": 149}, {"provider_url": "http://workless.ikreativ.com", "description": "Workless - A classy HTML5, CSS3 framework", "title": "Workless - A classy HTML5, CSS3 framework", "url": "http://workless.ikreativ.com/typography.html?utm_source=twitterfeed&utm_medium=twitter", "thumbnail_width": 44, "thumbnail_url": "http://workless.ikreativ.com/assets/img/logo.png", "version": "1.0", "provider_name": "Ikreativ", "type": "link", "thumbnail_height": 44}, {"provider_url": "http://workless.ikreativ.com", "description": "Workless - A classy HTML5, CSS3 framework", "title": "Workless - A classy HTML5, CSS3 framework", "url": "http://workless.ikreativ.com/typography.html", "thumbnail_width": 44, "thumbnail_url": "http://workless.ikreativ.com/assets/img/logo.png", "version": "1.0", "provider_name": "Ikreativ", "type": "link", "thumbnail_height": 44}, {"provider_url": "http://books.rakuten.co.jp", "description": "\u4e88\u7d04\u30fb\u521d\u56de\u7248\u30fb\u9650\u5b9a\u7248\u30fb\u7279\u5178\u4ed8\u304d\u5546\u54c1\u306e\u3054\u6ce8\u610f \u3010\u5185\u5bb9\u60c5\u5831\u3011\uff08\u300cBOOK\u300d\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9\u3088\u308a\uff09 \u30ec\u30b9\u30dd\u30f3\u30b7\u30d6\uff37\uff45\uff42\u30c7\u30b6\u30a4\u30f3\u3001\u30c7\u30d0\u30a4\u30b9\u306e\u7279\u6027\u3084\u6a5f\u80fd\u306e\u5224\u5b9a\u3001\u30d3\u30e5\u30fc\u30dd\u30fc\u30c8\u306e\u8a2d\u5b9a\u3001\u9ad8\u89e3\u50cf\u5ea6\u30c7\u30d0\u30a4\u30b9\u3078\u306e\u5bfe\u5fdc...\u3002\u77e5\u3063\u3066\u304a\u304d\u305f\u3044\u30b9\u30de\u30fc\u30c8\u30d5\u30a9\u30f3\u30fb\u30bf\u30d6\u30ec\u30c3\u30c8\u5bfe\u5fdc\u30b5\u30a4\u30c8\u69cb\u7bc9\u306e\u30c6\u30af\u30cb\u30c3\u30af\u3092\u3053\u306e\uff11\u518a\u3067\u3002 \u3010\u76ee\u6b21\u3011\uff08\u300cBOOK\u300d\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9\u3088\u308a\uff09 ...", "title": "\u30b9\u30de\u30fc\u30c8\u30d5\u30a9\u30f3\u30b5\u30a4\u30c8\u306e\u305f\u3081\u306eHTML5\uff0bCSS3", "thumbnail_width": 200, "url": "http://books.rakuten.co.jp/rb/%E3%82%B9%E3%83%9E%E3%83%BC%E3%83%88%E3%83%95%E3%82%A9%E3%83%B3%E3%82%B5%E3%82%A4%E3%83%88%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AEHTML5%EF%BC%8BCSS3-%E3%82%A8%E3%83%BB%E3%83%93%E3%82%B9%E3%82%B3%E3%83%A0%E3%83%BB%E3%83%86%E3%83%83%E3%82%AF%E3%83%BB%E3%83%A9%E3%83%9C-9784839943325/item/11894043/", "thumbnail_url": "http://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/3325/9784839943325.jpg?_ex=200x200&s=2&r=1", "version": "1.0", "provider_name": "Rakuten", "type": "link", "thumbnail_height": 258}, {"provider_url": "http://fmabc.blog.so-net.ne.jp", "description": "iPhone\u30a2\u30d7\u30ea\u3084Android\u30a2\u30d7\u30ea\u3001WEB\u5236\u4f5c\u306e\u95a2\u9023\u66f8\u7c4d\u306f\u6570\u591a\u304f\u3042\u308a\u307e\u3059\u304c\u3001\u3069\u308c\u3082\u4e00\u9577\u4e00\u77ed\u3067\u666e\u6bb5PC\u30b5\u30a4\u30c8\u3092\u624b\u639b\u3051\u3066\u3044\u308b\u65b9\u306b\u306f\u7269\u8db3\u308a\u306a\u3044\u3053\u3068\u304c\u307b\u3068\u3093\u3069\u3067\u3057\u305f\u3002 \u3053\u3061\u3089\u306e\u66f8\u7c4d\u306f\u3001\u30b9\u30de\u30fc\u30c8\u30d5\u30a9\u30f3\uff08iPhone/Android\uff09\u306e\u6982\u8981\u304b..", "title": "WEB\u5236\u4f5c\u30d5\u30ed\u30fc\u3001\u30ef\u30a4\u30e4\u30fc\u30d5\u30ec\u30fc\u30e0\u306e\u4f5c\u6210\u30c4\u30fc\u30eb\u3001\u6700\u65b0HTML5/CSS3\uff08\u5148\u884c\u5b9f\u88c5\u30d7\u30ed\u30d1\u30c6\u30a3\uff09\u306b\u6e21\u308b\u307e\u3067\u3001\u7c21\u5358\u304b\u3064\u6c17\u4ed8\u304d\u3092\u4e0e\u3048\u3066\u304f\u308c\u308b\u7d20\u6674\u3089\u3057\u3044\u66f8\u7c4d\u3067\u3059\u3002: \u4e00\u4eba\u66ae\u3089\u3057\u7814\u7a76\u3000iPhone\u3068\u795e8\u306e\u3044\u3044\u3068\u3053\u308d", "thumbnail_width": 72, "url": "http://fmabc.blog.so-net.ne.jp/2012-01-09-4", "thumbnail_url": "http://blog.so-net.ne.jp/_profile/_24e/fmabc/_m_fmabc.png", "version": "1.0", "provider_name": "So-net", "type": "link", "thumbnail_height": 96}, {"provider_url": "http://codepen.io", "title": "CSS3 text-shadow effects - CodePen", "url": "http://codepen.io/juanbrujo/full/yGpAK", "version": "1.0", "provider_name": "Codepen", "type": "link"}, {"provider_url": "http://www.skylardesign.com", "description": "My name is Justin Agoglia, Principal at Skylar Design, and I specialize in handcrafting responsive web designs using HTML5, CSS3, jQuery, typography, and anything pertaining to front-end web design and development but with a far GREATER PURPOSE. With over a decade of experience, every site is designed with passion and coded with meticulous care.", "title": "Skylar Design", "mean_alpha": 20.3057692308, "thumbnail_width": 130, "url": "http://www.skylardesign.com/", "thumbnail_url": "http://www.skylardesign.com/assets/img/skylarCircle.png", "version": "1.0", "provider_name": "Skylardesign", "type": "link", "thumbnail_height": 130}, {"provider_url": "http://www.codecademy.com", "description": "Codecademy is the easiest way to learn how to code. It's interactive, fun, and you can do it with your friends.", "title": "Getting Started", "url": "http://www.codecademy.com", "thumbnail_width": 297, "thumbnail_url": "http://www.codecademy.com/assets/homepage/community-15aaa124541705cdc7490405a1a4a273.png", "version": "1.0", "provider_name": "Codecademy", "type": "link", "thumbnail_height": 149}, {"provider_url": "http://www.christopher-ware.com", "description": "I am a website designer / front-end developer living and working in Birmingham, Alabama. I am passionate about design, typography, web standards, and user experience. I enjoy helping businesses and individuals create professional, attractive websites. I also really enjoy collaborating with other creative people who love what they do.", "url": "http://www.christopher-ware.com", "thumbnail_width": 502, "thumbnail_url": "http://www.christopher-ware.com/wp-content/uploads/2013/01/ms_sm.jpg", "version": "1.0", "provider_name": "Christopher-ware", "type": "link", "thumbnail_height": 324}, {"provider_url": "http://books.rakuten.co.jp", "description": "\u4e88\u7d04\u30fb\u521d\u56de\u7248\u30fb\u9650\u5b9a\u7248\u30fb\u7279\u5178\u4ed8\u304d\u5546\u54c1\u306e\u3054\u6ce8\u610f \u3010\u5185\u5bb9\u60c5\u5831\u3011\uff08\u300cBOOK\u300d\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9\u3088\u308a\uff09 \u30ec\u30b9\u30dd\u30f3\u30b7\u30d6\uff37\uff45\uff42\u30c7\u30b6\u30a4\u30f3\u3001\u30c7\u30d0\u30a4\u30b9\u306e\u7279\u6027\u3084\u6a5f\u80fd\u306e\u5224\u5b9a\u3001\u30d3\u30e5\u30fc\u30dd\u30fc\u30c8\u306e\u8a2d\u5b9a\u3001\u9ad8\u89e3\u50cf\u5ea6\u30c7\u30d0\u30a4\u30b9\u3078\u306e\u5bfe\u5fdc...\u3002\u77e5\u3063\u3066\u304a\u304d\u305f\u3044\u30b9\u30de\u30fc\u30c8\u30d5\u30a9\u30f3\u30fb\u30bf\u30d6\u30ec\u30c3\u30c8\u5bfe\u5fdc\u30b5\u30a4\u30c8\u69cb\u7bc9\u306e\u30c6\u30af\u30cb\u30c3\u30af\u3092\u3053\u306e\uff11\u518a\u3067\u3002 \u3010\u76ee\u6b21\u3011\uff08\u300cBOOK\u300d\u30c7\u30fc\u30bf\u30d9\u30fc\u30b9\u3088\u308a\uff09 ...", "title": "\u30b9\u30de\u30fc\u30c8\u30d5\u30a9\u30f3\u30b5\u30a4\u30c8\u306e\u305f\u3081\u306eHTML5\uff0bCSS3", "thumbnail_width": 200, "url": "http://books.rakuten.co.jp/rb/%E3%82%B9%E3%83%9E%E3%83%BC%E3%83%88%E3%83%95%E3%82%A9%E3%83%B3%E3%82%B5%E3%82%A4%E3%83%88%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AEHTML5%EF%BC%8BCSS3-%E3%82%A8%E3%83%BB%E3%83%93%E3%82%B9%E3%82%B3%E3%83%A0%E3%83%BB%E3%83%86%E3%83%83%E3%82%AF%E3%83%BB%E3%83%A9%E3%83%9C-9784839943325/item/11894043/", "thumbnail_url": "http://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/3325/9784839943325.jpg?_ex=200x200&s=2&r=1", "version": "1.0", "provider_name": "Rakuten", "type": "link", "thumbnail_height": 258}, {"provider_url": "http://app.swayy.co", "title": "Swayy.co - Redirecting to http://feedproxy.google.com/~r/net/topstories/~3/0Ryv7xFvKrY/story01.htm...", "url": "http://app.swayy.co/links/142262eb234441c0a5c6ff9e675e5973/", "version": "1.0", "provider_name": "Swayy", "type": "link"}, {"provider_url": "http://dev.w3.org", "description": "Abstract CSS Exclusions define arbitrary areas around which inline content ([CSS21]) content can flow. CSS Exclusions can be defined on any CSS block-level elements. CSS Exclusions extend the notion of content wrapping previously limited to floats. CSS Shapes control the geometric shapes used for wrapping inline flow content outside or inside an element.", "title": "CSS Exclusions and Shapes Module Level 3", "url": "http://dev.w3.org/csswg/css-exclusions/", "thumbnail_width": 600, "thumbnail_url": "http://dev.w3.org/csswg/css-exclusions/images/exclusions-illustration.png", "version": "1.0", "provider_name": "W3", "type": "link", "thumbnail_height": 400}, {"provider_url": "http://www.codeschool.com", "description": "Design and build functional sites with HTML5 & CSS3.", "title": "Code School - Functional HTML5 & CSS3", "thumbnail_width": 256, "url": "http://www.codeschool.com/courses/functional-html5-css3", "thumbnail_url": "http://d1tijy5l7mg5kk.cloudfront.net/assets/avatar-e3c7f6b4e29c458d1b21438c3a193666.png", "version": "1.0", "provider_name": "Codeschool", "type": "link", "thumbnail_height": 256}, {"provider_url": "http://themeforest.net", "description": "VERSION 1 .1 (17 June 2012) - Hot fix for wp 3.4 TO UPDATE : 1) Copy medialibrary-uploader.php from archive folder \"/admin\" to wp-content/themes/evolet/admin.Or just reinstall theme. VERS...", "title": "EVOLET - Premium WordPress Theme", "url": "http://themeforest.net/item/-evolet-premium-wordpress-theme/1926719", "thumbnail_width": 80, "thumbnail_url": "http://1.s3.envato.com/files/22320314/evolet_small.jpg", "version": "1.0", "provider_name": "Themeforest", "type": "link", "thumbnail_height": 80}, {"provider_url": "http://themeforest.net", "description": "Version 1.02 Available for Download See changelog below. LinkUp Multipurpose HTML Template LinkUp is a multipurpose HTML / CSS3 template for Blog, Portfolio, Galleries, etc. A clean and easy to customize css style sheets with detailed commented css codes.", "title": "LinkUp Multipurpose HTML Template", "author_name": "ZERGE", "thumbnail_width": 80, "url": "http://themeforest.net/item/linkup-multipurpose-html-template/2222718", "thumbnail_url": "http://3.s3.envato.com/files/25700544/thumbnail-linkup.jpg", "author_url": "http://themeforest.net/user/ZERGE", "version": "1.0", "provider_name": "Themeforest", "type": "link", "thumbnail_height": 80}];
	}

	Feed.prototype = {};

	Feed.prototype.pop = function() {
		return this.items.pop();
	};

	return Feed;

});