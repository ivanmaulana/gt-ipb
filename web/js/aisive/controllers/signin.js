'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', function($scope, $http, $state, Auth) {
    $scope.user = {};
    $scope.authError = null;
	$scope.errorCount = 0;
    $scope.login = function() {
		Auth.login($scope.user.username, $scope.user.password).then(
			function (data) { $state.go('ai.dashboard', {}, {location: 'replace'}); },
			function (data) { $scope.authError = data + ' #' + ++$scope.errorCount }
		);
    };
  })
;