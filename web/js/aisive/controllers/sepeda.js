app.controller('SepedaCtrl', function ($scope, JenisSepedaService, LokasiSepedaService, SqlService, toaster, AnchorSmoothScrollService) {
	
	// SepedaBaru
	
	$scope.sepedaCari = {};
	$scope.sepedaCari.jenisSepedaId = "1";
	$scope.sepedaBaru = {};
	$scope.sepedaBaru.sepedaId = "1";
	$scope.sepedaBaru.jenisSepedaId = "1";
	$scope.sepedaBaru.sepedaLokasi = "1";
	
	
	// Database
//	$scope.SepedaService = SepedaService;
	$scope.JenisSepedaService = JenisSepedaService;
	$scope.LokasiSepedaService= LokasiSepedaService;
    
	// Tambahkan Sepeda Baru	
	$scope.tambahSepeda = function () {		
		SqlService.conn('tambahSepeda', $scope.sepedaBaru).then(
			function(data) {
				if (data.insertError) toaster.pop('warning', 'Error', 'ID dan jenis sepeda sudah ada sebelumnya. Gunakan ID sepeda yang lainnya agar tidak terjadi duplikasi.');
				if (data.insertSuccess) {
					SepedaService.update();
					toaster.pop('success', 'Success', 'Sepeda baru berhasil ditambahkan.');
				}
			},
			function (data) { console.log(data); }
		);
	}
    
	// Cari sepeda Baru	
	$scope.cariSepeda = function () {	
		SqlService.conn('cariSepeda', $scope.sepedaCari).then(
			function(data) {
				if (data[1]) {
					$scope.sepedaEdit = data[1];
					AnchorSmoothScrollService.scrollTo('formEdit');
				}
				else toaster.pop('warning', 'Error', 'Sepeda tidak ditemukan');
			},
			function (data) { console.log(data); }
		);
	}

	// Edit Sepeda Baru	
	$scope.doEdit = function () {
		console.log($scope.sepedaEdit);
		SqlService.conn('editSepeda', $scope.sepedaEdit).then(
			function(data) {
				if (data.updateError) toaster.pop('warning', 'Error', 'Tidak ada informasi yang dirubah.');
				if (data.updateSuccess) {
					toaster.pop('success', 'Success', 'Infomasi sepeda berhasil dirubah.');
				}
			},
			function (data) { console.log(data); }
		);
	}
});