(function () {
	/**/
	"use strict";

	var fs = require('fs');

	exports.readTokenFromFile = function(tokenName, callback) {
		var tokenValue;
		fs.readFile('./.env', 'utf8', function(err, data) {
			if(err) { throw err; }
			var lines = data.split('\n');
			lines.forEach(function(line) {
				var parts = line.split('=');
				if( parts[0] === tokenName ) {
					tokenValue = parts[1];
				}
			});
			callback(tokenValue);
		});
	};

} ());