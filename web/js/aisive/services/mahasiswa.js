app.service('MahasiswaService', function (SqlService) {
	
	var mahasiswa = {};
	
	mahasiswa.data = {};
	
	mahasiswa.update = function () {
		SqlService.conn0('mahasiswaDenda').then(
			function (data) { mahasiswa.data = data;},
			function (data) { console.log(data); }
		)
	}

	mahasiswa.update();
	
	return mahasiswa;
	
});
