app.controller('DashboardCtrl', function ($scope, SqlService, StatistikService, ShelterService, JumlahPeminjamanService) {
	
	// Database
	$scope.StatistikService = StatistikService;
	$scope.ShelterService = ShelterService;
	$scope.JumlahPeminjamanService = JumlahPeminjamanService;
    
	
});