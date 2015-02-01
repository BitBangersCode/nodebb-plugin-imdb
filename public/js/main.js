(function(window) {

	var imdburls
	var regex = new RegExp('(?:https?:\/\/)?(?:www\.)?(?:imdb\.com)\/(?:title)\/(.+)\/', 'g');
	var urls;
	var omdburl;

	function createOMDB(id){
		var omdburl = 'http://www.omdbapi.com/?i=' + id + '&plot=short&r=json';
		return omdburl;
	}

	function getFilmInfo(url){
		var filmData;
		$.get(url, function(data){
			filmData = JSON.parse(data);
			console.log(filmData.Title);
		});
	}

	$(document).ready(function() {

		urls = document.links;
		for (var i = 0; i < urls.length; i++) {
			while ((imdburls = regex.exec(urls[i].href)) != null) {
				omdburl = createOMDB(imdburls[1]);
				getFilmInfo(omdburl);
			}
		}
	});
})(window);