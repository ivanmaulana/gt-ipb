app.service('Auth', function ($rootScope, LocalStorage, $state, $q, SqlService) {	
	
	this.isLogin = function () {
		return (LocalStorage.get('penjagaToken') != '');
	};
	
	this.controller = function (toState) {
	
		var deferred = $q.defer();
		if (this.isLogin()) {
			if (toState.name.split('.')[0] == 'signin') {
				deferred.reject('ai.dashboard');
			}
			else {
				deferred.resolve('success');
			}
		}
		else {
			if (toState.name.split('.')[0] == 'signin') {
				deferred.resolve('success');
			}
			else {			
				deferred.reject('signin');
			}
		};
		return deferred.promise;
	};
	
	
	this.login = function (username, password) {
		var deferred = $q.defer();
		dataPost = {penjagaUsername : username, password : password};
		SqlService.conn('signin', dataPost).then(
			function (data) { 
				if (data.penjagaToken) {
					LocalStorage.set('penjagaToken', data.penjagaToken);
					deferred.resolve(data);
				}
				else deferred.reject('Username or password is invalid');
			},
			function (data) { deferred.reject(data); }
		);
		return deferred.promise;
	};
	
});