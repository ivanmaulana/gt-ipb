app.service('SepedaService', function (SqlService) {
	
	var sepeda = {};
	
	sepeda.data = {};
	
	sepeda.update = function () {
		SqlService.conn0('sepeda').then(
			function (data) { sepeda.data = data;},
			function (data) { console.log(data); }
		)
	}

	sepeda.update();
	
	return sepeda;
	
});
