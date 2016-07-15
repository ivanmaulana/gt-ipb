app.service('PeminjamanService', function (SqlService) {
	
	var peminjaman = {};
	
	peminjaman.data = {};
	
	peminjaman.update = function () {
		SqlService.conn0('peminjaman').then(
			function (data) { peminjaman.data = data; },
			function (data) { console.log(data); }
		)
	}

	peminjaman.update();
	
	return peminjaman;
	
});
