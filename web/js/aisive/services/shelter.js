app.service('ShelterService', function (SqlService) {
	
	var shelter = {};
	
	shelter.data = {};
	
	shelter.update = function () {
		SqlService.conn0('shelter').then(
			function (data) { shelter.data = data;},
			function (data) { console.log(data); }
		)
	}

	shelter.update();
	
	return shelter;
	
});
