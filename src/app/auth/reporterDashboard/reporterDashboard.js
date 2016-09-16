
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
		},
		resolve: {
			villains: ["Villain", "user", function(Villain, user) {
				return Villain.getList({ owner: user.id });
			}]
		}
	});
})

.controller('ReporterDashboardCtrl', function ($scope, $state, PageTitle, villains) {
	PageTitle.setTitle("Reporter Dashboard");
	$scope.villains = villains;

	console.log(villains);
})

;

