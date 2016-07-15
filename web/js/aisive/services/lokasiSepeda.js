app.service('LokasiSepedaService', function (SqlService) {
	
	var lokasiSepeda = {};
	
	lokasiSepeda.data = {};
	
	lokasiSepeda.update = function () {
		SqlService.conn0('lokasiSepeda').then(
			function (data) { lokasiSepeda.data = data;},
			function (data) { console.log(data); }
		)
	}

	lokasiSepeda.update();
	
	return lokasiSepeda;
	
});
