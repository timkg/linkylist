(function () {
	/**/
	"use strict";

	define([

	], function() {

		// starts request to server to search for links with certain keyword
		// makes paginated requests - not by index, but "next"
		// server responds with number of links and streams links as they are ready
		// collection creates as many link objects as # in response
		// collection promises link info to each newly created model
		// collection resolves promises as server streams info

	});

} ());