
angular.module('EtchBoilerplate.Auth.Home', [
	'ui.router',
	'EtchBoilerplate.PageTitle'
])

.config(function config( $stateProvider ) {
	$stateProvider.state('app.auth.home', {
		url: '/home',
		views: {
			"auth": {
				controller: 'HomeCtrl',
				templateUrl: 'auth/home/home.tpl.html'
			}
		}
	});
})

.controller('HomeCtrl', function ($scope, $state, PageTitle) {
	PageTitle.setTitle("Home");
})

;

