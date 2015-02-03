(function(window) {

	var urls;
	var href;
	var omdburl;
	var target;
	var regex = new RegExp('(?:https?:\/\/)?(?:www\.)?(?:imdb\.com)\/(?:title)\/(.+)\/', 'g');

	function createOMDB(id){
		var url = 'http://www.omdbapi.com/?i=' + id + '&plot=short&r=json';
		return url;
	}

	function getFilmInfo(url){
		var filmData;
		$.get(url, function(data){
			showPopover(JSON.parse(data), target);
		});
	}

	function showPopover(filmData, target){
		target.popover({ 
			trigger: 'hover', 
			placement: 'right',
			title: filmData.Title 
		}).popover('show');
	}

	$(document).ready(function() {
		$(document).on('mouseover', 'a', function(e){
			target = $(e.currentTarget);
			href = $(this).attr('href');
			while((urls = regex.exec(href)) !== null) {
				omdburl = createOMDB(urls[1]);
				getFilmInfo(omdburl);
			}
		});
	});
})(window);