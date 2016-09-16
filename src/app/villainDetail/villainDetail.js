angular.module('BecomeAHero.VillainDetail', [
	'ui.router',
	'BecomeAHero.Data.Villain',
	'BecomeAHero.Data.Mission',
	'BecomeAHero.PageTitle'
])

.config(function config( $stateProvider ) {
	$stateProvider.state('app.villainDetail', {
		url: '/villain/:id',
		views: {
			"app": {
				controller: 'VillainDetailCtrl',
				templateUrl: 'villainDetail/villainDetail.tpl.html'
			}
		},
		resolve: {
			villain: ["Villain", "$stateParams", function(Villain, $stateParams) {
				return Villain.one($stateParams.id).get();
			}],
			user: ["User", "$state", function(User, $state) {
				return User.current();
			}]
		},
		data: {
			title: "VillainDetail"
		}
	});
})

.controller('VillainDetailCtrl', function ($scope, $state, PageTitle, villain, Mission, user) {
	PageTitle.setTitle(villain.name);

	$scope.villain = villain;
	$scope.acceptMission = acceptMission;
	$scope.completeMission = completeMission;

	function acceptMission() {
		Mission.create({
			"userId": user.id,
			"villainId": villain.id,
			"createdAt": new Date().toISOString()
		}).save().then(function(mission) {
			$state.go("app.auth.heroDashboard");
		});
	}

	function completeMission() {
		Mission.create(villains.missions[0]).customPOST('complete').then(function() {
			$state.go("app.auth.reporterDashboard");
		});
	}


})

;

