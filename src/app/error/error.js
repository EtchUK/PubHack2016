
angular.module('BecomeAHero.Error', [
	'ui.router',
	'BecomeAHero.Data.HttpPendingRequestsService',
	'BecomeAHero.PageTitle',
	'BecomeAHero.History'
])

.config(function($stateProvider) {
	$stateProvider.state('error', {
		url: '/error',
		views: {
			"index": {
				controller: 'ErrorCtrl',
				templateUrl: 'error/error.tpl.html'
			}
		}
	});
})

.controller('ErrorCtrl', function($scope, $state, History, HttpPendingRequestsService, PageTitle) {
	PageTitle.setTitle("Error");
	HttpPendingRequestsService.cancelAll();
	$scope.error = $state.$current.error;
	$scope.retry = retry;
	// if this is the first state after the page refresh
	if (!History.previous()) {
		retry();
	}


	function retry() {
		if ($state.current.error && $state.current.error.toState) {
			$state.go($state.current.error.toState, $state.current.error.toParams);
		} else {
			$state.go("app.homepage");
		}
	}
})

;

