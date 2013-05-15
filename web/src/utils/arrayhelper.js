(function() {
	/**/
	"use strict";

	exports.unique = function(arr) {
		var uniqueValues = [];
		arr.forEach(function(value) {
			if (uniqueValues.indexOf(value) === -1) {
				uniqueValues.push(value);
			}
		})

		return uniqueValues;
	};

} ());