app.service('JenisSepedaService', function (SqlService) {
	
	var jenisSepeda = {};
	
	jenisSepeda.data = {};
	
	jenisSepeda.update = function () {
		SqlService.conn0('jenisSepeda').then(
			function (data) { jenisSepeda.data = data;},
			function (data) { console.log(data); }
		)
	}

	jenisSepeda.update();
	
	return jenisSepeda;
	
});
