app.controller('MahasiswaCtrl', function ($scope, JenisSepedaService, LokasiSepedaService, SqlService, toaster, AnchorSmoothScrollService, MahasiswaService) {
	
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
	$scope.MahasiswaService= MahasiswaService;
    
    
	// Cari sepeda Baru	
	$scope.cariMahasiswa = function () {	
		console.log($scope.mahasiswaCari);
		SqlService.conn('cariMahasiswa', $scope.mahasiswaCari).then(
			function(data) {
				if (data[1]) {
					$scope.mahasiswaEdit = data[1];
					AnchorSmoothScrollService.scrollTo('formEdit');
				}
				else toaster.pop('warning', 'Error', 'Mahasiswa tidak ditemukan');
			},
			function (data) { console.log(data); }
		);
	}

	// Edit Sepeda Baru	
	$scope.editMahasiswa = function (mahasiswa) {
		$scope.mahasiswaEdit = mahasiswa;
		AnchorSmoothScrollService.scrollTo('formEdit');
	}
	
	$scope.doEdit = function () {
		SqlService.conn('editMahasiswa', $scope.mahasiswaEdit).then(
			function(data) {
				if (data.updateError) toaster.pop('warning', 'Error', 'Tidak ada informasi yang dirubah.');
				if (data.updateSuccess) {
					toaster.pop('success', 'Success', 'Infomasi sepeda berhasil dirubah.');
					MahasiswaService.update();
				}
			},
			function (data) { console.log(data); }
		);
	}
});