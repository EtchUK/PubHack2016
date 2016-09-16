
angular.module('EtchBoilerplate.Auth', [
	'ui.router',
	'EtchBoilerplate.Auth.HeroDashboard'
])

.config(function ($stateProvider) {
	$stateProvider.state('app.auth', {
		abstract: true,
		url: '',
		resolve: {
			user: ["User", "$state", function(User, $state) {
				return User.getProfile()['catch'](function() {
					$state.go("app.login");
				});
			}]
		},
		views: {
			"app": {
				template: '<div ui-view="auth" autoscroll="false"></div>'
			}
		}
	});
})

;