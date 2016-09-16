angular.module('BecomeAHero.Auth.ReportVillain', [
	'ui.router',
	'BecomeAHero.Data.Villain',
	'BecomeAHero.PageTitle',
	'BecomeAHero.Data.VillainCategory'
])

.config(function config( $stateProvider ) {
	$stateProvider.state('app.auth.reportVillain', {
		url: '/report-villain?id',
		views: {
			"auth": {
				controller: 'ReportVillainCtrl',
				templateUrl: 'auth/reportVillain/reportVillain.tpl.html'
			}
		},
		resolve: {
			villain: ["Villain", "$stateParams", "user", function(Villain, $stateParams, user) {
				if (!$stateParams.id) {
					return Villain.create({
						"ownerId": user.id
					});
				}
				return Villain.get($stateParams.id);
			}],
			villainCategories: ["VillainCategory", function(VillainCategory) {
				return VillainCategory.getList();
			}]
		}
	});
})

.controller('ReportVillainCtrl', function ($scope, $state, PageTitle, villain, villainCategories) {
	PageTitle.setTitle(villain.name);

	$scope.villain = villain;
	$scope.villainCategories = villainCategories;
	$scope.reportVillain = reportVillain;

	function reportVillain() {
		$scope.villain.createdAt = new Date().toISOString();
		$scope.villain.save().then(function() {
			$state.go("app.auth.reporterDashboard");
		});
	}


})

;

