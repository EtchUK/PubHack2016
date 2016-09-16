
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
			}],
			user: ["User", function(User) {
				var id = User.current().id;
				return User.one(id).get();
			}]
		}
	});
})

.controller('HeroDashboardCtrl', function ($scope, $state, PageTitle, user, availableVillains, User) {
	PageTitle.setTitle("HeroDashboard");

	$scope.availableVillains = availableVillains;

	$scope.user = user;

	$scope.currentMissions = user.missions;
	user.missions.forEach(function(m) {
		m.introText = missionText();
	});

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

	$scope.editMode = false;
	$scope.toggleEdit = function(){
		$scope.editMode = !$scope.editMode;
		user.put();
		User.setCurrent(user);
	};
})

;

