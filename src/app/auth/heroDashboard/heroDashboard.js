
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
		}
	});
})

.controller('HeroDashboardCtrl', function ($scope, $state, PageTitle) {
	PageTitle.setTitle("HeroDashboard");
})

;

