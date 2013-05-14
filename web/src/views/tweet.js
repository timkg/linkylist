var jade = require('jade')
  , fs = require('fs');

var tweet = {
	created_at: "2013-05-06T17:18:35.000Z",
	entities: {
		hashtags: [ ],
		urls: [
			{
				url: "http://t.co/OTYH9T13kj",
				expanded_url: "http://tinyurl.com/cjpgt2o",
				display_url: "tinyurl.com/cjpgt2o",
				indices: [
					114,
				136
			]
		}
		],
		user_mentions: [ ]
	},
	from_user: "GamesForFree1",
	from_user_id: 489256143,
	from_user_id_str: "489256143",
	from_user_name: "Andrew Johnson",
	id: 331457978823753700,
	id_str: "331457978823753728",
	profile_image_url: "http://a0.twimg.com/profile_images/1819345069/happy_business_man_normal.jpg",
	profile_image_url_https: "https://si0.twimg.com/profile_images/1819345069/happy_business_man_normal.jpg",
	source: "&lt;a href=&quot;http://twitterfeed.com&quot;&gt;twitterfeed&lt;/a&gt;",
	text: "News - Mozilla, Otoy team on new JavaScript video codec that eliminates need for plug-ins: The Mozilla Foundat... http://t.co/OTYH9T13kj",
	_id: "5187e60f49653fc427000001",
	__v: 0
};

jade.renderFile('./tweet.jade', {tweet: tweet}, function(err, str) {
	if (err) { throw err; }
	console.log(str);
});