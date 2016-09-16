angular.module('EtchBoilerplate.VendorOverrides.UiRouter', [
	'ui.router'
])

// hack to fix https://github.com/angular-ui/ui-router/commit/7344342018847902594dc1fc62d30a5c30f01763
.config(function($provide, $uiViewScrollProvider) {
	$provide.decorator('$state', ['$delegate', '$injector', function($delegate, $injector) {
		$delegate.reload = function() {
			return this.go('.', null, { reload: true });
		};
		$delegate.asyncGo = function() {
			var $timeout = $injector.get("$timeout");
			var self = this;
			var args = arguments;
			return $timeout(function() {
				self.go.apply(self, args);
			});
		};
		return $delegate;
	}]);
})

.run(function($rootScope, $state, $timeout) {

	$rootScope.$on('$stateChangeSuccess',function(){
		$timeout(function() {
			window.scrollTo(0, 0);
		},50); // setting this to 50 since something is scrolling the page down at some points despite ui-view autoscroll=false
	});
	
	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
		event.preventDefault();
		console.error('$stateChangeError', arguments);
		$state.get("error").error = { message: _.isString(error) ? error : null, toState: toState, toParams: toParams };
		$state.go("error");
	});
	$rootScope.$on('$stateNotFound', function() {
		console.error('$stateNotFound', arguments);
	});

})

;