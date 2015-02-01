(function(module) {
	'use strict'

	var OMDB = {};

	OMDB.parse = function(data, callback) {
		if (!data || !data.postData || !data.postData.content) {
			return callback(null, data);
		}
		//var postCopy = data.postData.content;
		//postCopy = postCopy.replace(urls[0], omdburl);
		//data.postData.content = postCopy;

		callback(null, data);
	};

	module.exports = OMDB;
}(module));