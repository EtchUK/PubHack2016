angular.module('BecomeAHero.Homepage', [
	'ui.router',
	'BecomeAHero.Data.User',
	'BecomeAHero.PageTitle'
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

		},
		data: {
			title: "Homepage"
		}
	});
})

.controller('HomepageCtrl', function ($scope, $state, PageTitle) {
	PageTitle.setTitle("Homepage");


})

;

