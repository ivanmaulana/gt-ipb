
app.service('SqlService', function ($http, $q, UrlServer, LocalStorage, Do) {
	this.conn = function (dataSql, dataPost) {	
		
		// Cache remover
		var d = new Date();
		var n = d.getTime(); 	
		
		var deferred = $q.defer();
		
		// Token validation
		dataPost.penjagaToken = LocalStorage.get('penjagaToken');
		
		$http({
			cache : false,
			method: 'POST',
			url: UrlServer + '?date='+n+'&sql='+dataSql,
			data: dataPost,
			headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
		})
			.success(function(data){
				if (data == false) deferred.reject('Connection failed');
				else {
					delete data.app;
					if (data.error) {
						Do.logout();
						deferred.reject(data.error);
					}
					else {
						if (dataSql != 'signin') delete data.penjagaToken;
						deferred.resolve(data);
					}
				}
			})
			.error(function(){
				deferred.reject('Connection failed');
			})
		return deferred.promise;
	};
	this.conn0 = function (dataGet) {	
		var deferred = $q.defer();
		var dataPost = {};
		this.conn(dataGet, dataPost).then(
			function(data) { deferred.resolve(data); },
			function(data) { deferred.reject(data); }
		);
		return deferred.promise;
	};
	this.connIter = function (dataGet, dataPost, iter) {	
		var deferred = $q.defer();
		this.conn(dataGet, dataPost).then(
			function(data) { data.iter = iter; deferred.resolve(data); },
			function(data) { deferred.reject(data); }
		);
		return deferred.promise;
	};
});
