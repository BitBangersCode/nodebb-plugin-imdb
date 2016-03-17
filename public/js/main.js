(function(window) {

	var urls;
	var setTimeoutConst;
	var href;
	var omdburl;
	var target;
	var regex = new RegExp('(?:https?:\/\/)?(?:www\.)?(?:imdb\.com)\/(?:title)\/(.+)\/', 'g');

	function createOMDB(id){
		var url = 'https://www.omdbapi.com/?i=' + id + '&plot=short&r=json';
		return url;
	}

	function getFilmInfo(url, callback){
		$.get(url, function(data){
			//showPopover(JSON.parse(data), target);
			callback(JSON.parse(data), target);
		});
	}

	function showPopover(filmData, target){
		target.popover({
			trigger: 'hover',
			placement: 'right',
			html: true,
			title: '<b>' + filmData.Title + '</b>',
			content: '<h5>Rating: '+ filmData.imdbRating +'</h5><h5>Genre: ' + filmData.Genre + '</h5><p>' + filmData.Plot + '</p>'
		}).popover('show');
	}

	$(document).ready(function() {
		$(document).on('mouseenter', 'a', function(e){
			target = $(e.currentTarget);
			href = $(this).attr('href');
			while((urls = regex.exec(href)) !== null) {
				omdburl = createOMDB(urls[1]);
				setTimeoutConst = setTimeout(function(){
					getFilmInfo(omdburl, function(filmData, target){
						showPopover(filmData, target);
					});
				}, 500);
			}
		}).on('mouseleave', 'a', function(){
			clearTimeout(setTimeoutConst);
			target.popover('destroy');
		});
	//	$(document).on('mouseenter', 'a', function(e){
	//		target = $(e.currentTarget);
	//		href = $(this).attr('href');
	//		while((urls = regex.exec(href)) !== null) {
	//			omdburl = createOMDB(urls[1]);
	//			getFilmInfo(omdburl, function(filmData, target){
	//				showPopover(filmData, target);
	//			});
	//		}
	//	}).on('mouseleave', 'a', function(){
	//		
	//	});
	});
})(window);
