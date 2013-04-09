// var server = require('./server/src/server.js');
// server.start();

var db = require('./server/src/db.js');
db.connect(function() {
	db.initLinkModel();
	db.getRecentLinks(console.log);
});
