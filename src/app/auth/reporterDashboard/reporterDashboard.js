
angular.module('BecomeAHero.Auth.ReporterDashboard', [
	'ui.router',
	'BecomeAHero.PageTitle'
])

.config(function config( $stateProvider ) {
	$stateProvider.state('app.auth.reporterDashboard', {
		url: '/reporter-dashboard',
		views: {
			"auth": {
				controller: 'ReporterDashboardCtrl',
				templateUrl: 'auth/reporterDashboard/reporterDashboard.tpl.html'
			}
		}
	});
})

.controller('ReporterDashboardCtrl', function ($scope, $state, PageTitle) {
	PageTitle.setTitle("Reporter Dashboard");
})

;

