angular.module('EtchBoilerplate.Loading.Service', [
])


.factory('LoadingService', function($rootScope) {
		
	var requests = {};

	var module = {
		isLoading: function(bucket) {
			if (!bucket) {
				bucket = "default";
			}
			return _.any(requests[bucket], function(request) {
				return request > 0;
			});
		},

		startRequest: function(requestKey, bucket) { // bucket allows you to specify a grouping/category for requests to separate loading indicators for different requests
			if (bucket === false) { // bucket explicitly set to false
				bucket = "--nospinner--"; // if bucket is set to false, lump them into a special separate bucket
			} else if (!bucket) { // no bucket specified
				bucket = "default";
			}
			requests[bucket] = requests[bucket] || {};
			requests[bucket][requestKey] = (requests[bucket][requestKey] || 0) + 1;

			if (!$rootScope.$$phase) {
				$rootScope.$apply();
			}
		},

		finishRequest: function(requestKey) {
			for (var bucket in requests) {
				// find the bucket that this request is in
				if (requestKey in requests[bucket] && requests[bucket][requestKey] > 0) {
					requests[bucket][requestKey]--;
					break;
				}
			}

			if (!$rootScope.$$phase) {
				$rootScope.$apply();
			}
		}

	};

	return module;
})

;
