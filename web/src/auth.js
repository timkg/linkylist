(function() {
	/**/
	"use strict";

	var everyauth = require('everyauth');
	var UserModel = require('./models/User').compileModel();

	exports.start = function(app) {
		// https://github.com/bnoguchi/everyauth/issues/303
		function preEveryauthMiddlewareHack() {
			return function (req, res, next) {
				var sess = req.session
					, auth = sess.auth
					, ea = { loggedIn: !!(auth && auth.loggedIn) };

				// Copy the session.auth properties over
				for (var k in auth) {
					ea[k] = auth[k];
				}

				if (everyauth.enabled.password) {
					// Add in access to loginFormFieldName() + passwordFormFieldName()
					ea.password || (ea.password = {});
					ea.password.loginFormFieldName = everyauth.password.loginFormFieldName();
					ea.password.passwordFormFieldName = everyauth.password.passwordFormFieldName();
				}

				res.locals.everyauth = ea;

				next();
			}
		};

		function postEveryauthMiddlewareHack() {
			var userAlias = everyauth.expressHelperUserAlias || 'user';
			return function( req, res, next) {
				res.locals.everyauth.user = req.user;
				res.locals[userAlias] = req.user;
				next();
			};
		};
		app.use(preEveryauthMiddlewareHack());
		app.use(everyauth.middleware());
		app.use(postEveryauthMiddlewareHack());
		everyauth.helpExpress(app);

		// user auth logic
		// ---------------
		var usersById = {};
		var nextUserId = 0;
		function addUser (source, sourceUser) {
			var user;
			if (arguments.length === 1) { // password-based
				user = sourceUser = source;
				user.id = ++nextUserId;
				return usersById[nextUserId] = user;
			} else { // non-password-based
				user = usersById[++nextUserId] = {id: nextUserId};
				user[source] = sourceUser;
			}
			return user;
		}
		var usersByTwitId = {};
		everyauth.everymodule
			.findUserById( function (id, callback) {
				UserModel.findOne({id: id}, function(err, user) {
					callback(err, user);
				});
			});
		everyauth.debug = true;
		everyauth.twitter
			.consumerKey(process.env.TWITTER_CONSUMER_KEY)
			.consumerSecret(process.env.TWITTER_CONSUMER_SECRET)
			.entryPath('/auth/twitter')
			.callbackPath('/auth/twitter/callback')
			.findOrCreateUser( function (session, accessToken, accessTokenSecret, twitterUserMetadata) {
				var promise = this.Promise();
				UserModel.findOrCreate(twitterUserMetadata, function(err, user) {
					return promise.fulfill(user);
				});
				return promise;
			}).redirectPath('/');
		app.use(everyauth.middleware());
	};
} ());