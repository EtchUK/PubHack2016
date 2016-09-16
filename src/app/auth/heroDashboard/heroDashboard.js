
angular.module('BecomeAHero.Auth.HeroDashboard', [
	'ui.router',
	'BecomeAHero.PageTitle'
])

.config(function config( $stateProvider ) {
	$stateProvider.state('app.auth.heroDashboard', {
		url: '/hero-dashboard',
		views: {
			"auth": {
				controller: 'HeroDashboardCtrl',
				templateUrl: 'auth/heroDashboard/heroDashboard.tpl.html'
			}
		},
		resolve: {
		}
	});
})

.controller('HeroDashboardCtrl', function ($scope, $state, PageTitle, user) {
	PageTitle.setTitle("HeroDashboard");
})

;

