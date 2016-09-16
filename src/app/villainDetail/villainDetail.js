angular.module('BecomeAVillain.VillainDetail', [
	'ui.router',
	'BecomeAHero.Data.Villain',
	'BecomeAVillain.PageTitle'
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
				return Villain.get($stateParams.id);
			}]
		},
		data: {
			title: "VillainDetail"
		}
	});
})

.controller('VillainDetailCtrl', function ($scope, $state, PageTitle, villain) {
	PageTitle.setTitle(villain.name);

	$scope.villain = villain;


})

;

