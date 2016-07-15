app.service('PenjagaShelterService', function (SqlService) {
	
	var penjagaShelter= {};
	
	penjagaShelter.data = {};
	
	penjagaShelter.update = function () {
		SqlService.conn0('penjagaShelter').then(
			function (data) { penjagaShelter.data = data;},
			function (data) { console.log(data); }
		)
	}

	penjagaShelter.update();
	
	return penjagaShelter;
	
});
