angular.module('BecomeAHero.Homepage', [
	'ui.router',
	'BecomeAHero.Data.User',
	'BecomeAHero.Data.Villain',
	'BecomeAHero.PageTitle',
	'BecomeAHero.VillainDetail'
])

.config(function config( $stateProvider ) {
	$stateProvider.state('app.homepage', {
		url: '/homepage',
		views: {
			"app": {
				controller: 'HomepageCtrl',
				templateUrl: 'homepage/homepage.tpl.html'
			}
		},
		resolve: {
			heroes: ["User", function(User) {
				return User.getList({ heroes: true });
			}],
			villains: ["Villain", function(Villain) {
				return Villain.getList();
			}]
		}
	});
})

.controller('HomepageCtrl', function ($scope, $state, PageTitle, heroes, villains) {
	PageTitle.setTitle("Homepage");

	$scope.heroes = heroes;
	$scope.villains = villains;

})

;

