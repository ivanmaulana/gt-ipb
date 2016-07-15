app.service('JumlahPeminjamanService', function (SqlService) {


	// jumlah data yang ditampilkan
	var jumlahData = 10;

	
	var serv = {};
	
	
	// Reload Chart
	serv.reloadChart = 0;
	
	
	// Fungsi konversi object dari database ke array yang sesuai dengan chart
	
	serv.toArrayDate = function (obj) {
		
		var arrReturn = [];
	
	
		for (var i=0; i<jumlahData; i++) {
			arrReturn.push([i,0]);			
		}
	
		for (var key in obj) {
		
			if(!obj.hasOwnProperty(key)) continue;
			
			// Maksimum tanggal yang ditampilkan
			var lastDate = (new Date((new Date()).valueOf() - 1000*60*60*24*(jumlahData-1)));
			
			// selisih waktu
			var selisihWaktu = (new Date(obj[key].tanggal)) - lastDate;
			
			// Jika tanggal dari database masuk dalam rentang tanggal yang ditampilkan
			if (selisihWaktu > 0) arrReturn[Math.ceil(selisihWaktu/(1000*60*60*24))] = [Math.ceil(selisihWaktu/(1000*60*60*24)), obj[key].jumlah];
		}
		


		return arrReturn;
	}

	serv.index = [];

	// Index
	serv.updateIndex = function () {
		serv.index = [];
		for (var i=0; i<jumlahData; i++) {
			serv.index.push([i, moment(new Date((new Date()).valueOf() - 1000*60*60*24*(jumlahData-i-1))).format('DD MMM')]);
		}
	}
	serv.updateIndex();
	
	
	
	serv.data = {};
	
	serv.update = function () {
		SqlService.conn0('jumlahSepedaPinjam').then(
			function (data) { serv.data.pinjam = serv.toArrayDate(data);  serv.reloadChart = !serv.reloadChart},
			function (data) { console.log(data); }
		)
		SqlService.conn0('jumlahSepedaKembali').then(
			function (data) { serv.data.kembali = serv.toArrayDate(data);  serv.reloadChart = !serv.reloadChart},
			function (data) { console.log(data); }
		)
	}

	serv.update();
	
	return serv;
	
});
