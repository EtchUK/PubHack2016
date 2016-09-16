angular.module('EtchBoilerplate.Loading.Interceptor', [
	'EtchBoilerplate.Loading.Service'
])

.config(function($httpProvider, $injector) {

	function hashCode(str) {
		var hash = 0, i, chr, len;
		if (str.length === 0) {
			return hash;
		}
		for (i = 0, len = str.length; i < len; i++) {
			chr = str.charCodeAt(i);
			hash = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	}

	function generateRequestKey(requestConfig) {
		return hashCode(requestConfig.method + requestConfig.url + JSON.stringify(requestConfig.params));
	}

	function startRequest(request, LoadingService) {
		var spinnerParam = request.params ? request.params.loadingSpinner : null;
		if (request.params) {
			delete request.params.loadingSpinner; // ensure the loadingSpinner param is not sent to the server
		}
		var key = generateRequestKey(request);
		LoadingService.startRequest(key, spinnerParam);
	}

	function finishRequest(response, LoadingService) {
		LoadingService.finishRequest(generateRequestKey(response.config));
	}


	var interceptor = ['$q', '$injector', 'LoadingService', function($q, $injector, LoadingService) {

			function success(response) {
				// get via $injector because of circular dependency problem
				finishRequest(response, LoadingService);
				return response;
			}

			function error(response) {
				// get via $injector because of circular dependency problem
				finishRequest(response, LoadingService);
				return $q.reject(response);
			}

			return {
				'request': function(config) {
					startRequest(config, LoadingService);
					return config;
				},
				'response': function(response) {
					return success(response);
				},
				'responseError': function(rejection) {
					return error(rejection);
				}
			};
		}];

	$httpProvider.interceptors.push(interceptor);
});