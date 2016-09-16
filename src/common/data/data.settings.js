angular.module('EtchBoilerplate.Data.Settings', [
	'ui.router',
	'restangular',
	'EtchBoilerplate.Environment'
])

.config(function(RestangularProvider, Environment) {

	if (Environment === "dev") {
		RestangularProvider.setBaseUrl("https://dev.example.com/api/");
	} else {
		RestangularProvider.setBaseUrl("https://example.com/api/");
	}
	/*RestangularProvider.setRestangularFields({
		id: "sys_id"
	});*/
})


.run(function(Restangular, Environment) {

	/* // Example of adding authentication to API requests

	Restangular.addFullRequestInterceptor(function(element, operation, route, url, headers, params, httpConfig) {
		var config = {headers: {}};

		if (Environment === "dev") {
			var token = TokenService.get();
			if (token) {
				config.headers["Authorization"] = "Basic " + token;
			}
		}

		return config;
	});*/

	Restangular.setErrorInterceptor(function(response, deferred, responseHandler) {

		console.log("Server error", response);
		// insert any logic to show a message to the user that there was an error
		// Alert.error(response.data.error);

		return true; // error not handled
	});


})

// Service that allows responses from endpoints to be cached
.factory('RestangularWithCaching', function(Restangular) {
	return Restangular.withConfig(function(RestangularConfigurer) {
		RestangularConfigurer.setDefaultHttpFields({cache: true});
	});
})

;