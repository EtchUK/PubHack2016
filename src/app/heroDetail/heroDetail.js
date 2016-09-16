angular.module('BecomeAHero.HeroDetail', [
	'ui.router',
	'BecomeAHero.Data.User',
	'BecomeAHero.PageTitle'
])

.config(function config( $stateProvider ) {
	$stateProvider.state('app.heroDetail', {
		url: '/hero/:id',
		views: {
			"app": {
				controller: 'HeroDetailCtrl',
				templateUrl: 'heroDetail/heroDetail.tpl.html'
			}
		},
		resolve: {
			hero: ["User", "$stateParams", function(User, $stateParams) {
				return User.one($stateParams.id).get();
			}]
		}
	});
})

.controller('HeroDetailCtrl', function ($scope, $state, PageTitle, hero) {
	PageTitle.setTitle(hero.name);

	$scope.hero = hero;
})

;

