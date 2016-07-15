app.service('StatistikService', function (SqlService) {
	
	var statistik = {};
	
	statistik.data = {};
	
	statistik.update = function () {
		SqlService.conn0('statistik').then(
			function (data) { statistik.data = data[1];},
			function (data) { console.log(data); }
		)
	}

	statistik.update();
	
	return statistik;
	
});
