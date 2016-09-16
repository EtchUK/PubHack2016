
angular.module('BecomeAHero.Auth', [
	'ui.router',
	'BecomeAHero.Auth.HeroDashboard'
])

.config(function ($stateProvider) {
	$stateProvider.state('app.auth', {
		abstract: true,
		url: '',
		resolve: {
			user: ["User", "$state", function(User, $state) {
				var user = User.current();
				if (user) {
					return user;
				} else {
					$state.go("app.login");
				}
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