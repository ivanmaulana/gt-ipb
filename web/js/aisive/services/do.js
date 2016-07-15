app.service('Do', function (LocalStorage, $state) {	
	
	this.logout = function () {
		LocalStorage.remove('penjagaToken');
		$state.go('signin', {}, {reload : true});
	};
	
});