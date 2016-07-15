app.controller('AiCtrl', function ($scope, Auth, $state, Do, $interval, JenisSepedaService, JumlahPeminjamanService, LokasiSepedaService, PenjagaShelterService, SepedaService, ShelterService, StatistikService) {
	$scope.logout = function () {
		Do.logout();
	}
	
	// Auto-update
	update = $interval(function() {
		JenisSepedaService.update();
		JumlahPeminjamanService.update();
		LokasiSepedaService.update();
		PenjagaShelterService.update();
		SepedaService.update();
		ShelterService.update();
		StatistikService.update();
	}, 30000);
});