
angular.module('BecomeAHero.Auth.HeroDashboard', [
	'ui.router',
	'BecomeAHero.PageTitle',
	'BecomeAHero.Data.Villain'
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
			availableVillains: ["Villain", function(Villain) {
				return Villain.getList();
				//TODO: Only get ones which match heroes location?
			}]
		}
	});
})

.controller('HeroDashboardCtrl', function ($scope, $state, PageTitle, user, availableVillains) {
	PageTitle.setTitle("HeroDashboard");

	$scope.availableVillains = availableVillains;

	$scope.missionText = missionText;

	function missionText(){
		var texts = [
			"Destroy the",
			"Crush the",
			"Defeat the",
			"Combat",
			"Wage war with",
			"Engage the"
		];
		var randomNumber = Math.floor(Math.random()*texts.length);
		return texts[randomNumber];
	}
})

;

