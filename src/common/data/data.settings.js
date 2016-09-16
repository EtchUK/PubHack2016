angular.module('BecomeAHero.Data.Settings', [
	'ui.router',
	'restangular',
	'BecomeAHero.Environment'
])

.config(function(RestangularProvider, Environment) {

	if (Environment === "dev") {
		RestangularProvider.setBaseUrl("http://pubhack2016api.azurewebsites.net/api/");
	} else {
		RestangularProvider.setBaseUrl("http://pubhack2016api.azurewebsites.net/api/");
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

.factory('MyRestangular', function (Restangular) {
	return function (resourceName) {
		var service = Restangular.service(resourceName);

		service.create = function(element) {
			return Restangular.restangularizeElement(null, element, resourceName);
		};

		service.createCollection = function(collection) {
			return Restangular.restangularizeCollection(null, collection, resourceName);
		};

		return service;
	};
})


// Service that allows responses from endpoints to be cached
.factory('RestangularWithCaching', function(Restangular) {
	return Restangular.withConfig(function(RestangularConfigurer) {
		RestangularConfigurer.setDefaultHttpFields({cache: true});
	});
})

;