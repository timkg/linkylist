exports.onResponse = function(jsonResponse, onDbCallback) {

	// check which are in DB
	// check which have embedly in DB
	// format response to send all links + the embedlies in DB + remainingEmbedsAreYetToComeUUID
	// call onDbCallback with formatted response
	// start embedly request for remaining
	// on response, init socket.io remainingEmbedsAreYetToComeUUID session. On connection, send links to client.
	// save remaining data (links + embedly) in DB

};