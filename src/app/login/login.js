angular.module('BecomeAHero.Login', [
	'ui.router',
	'BecomeAHero.Data.User',
	'BecomeAHero.PageTitle'
])

.config(function config( $stateProvider ) {
	$stateProvider.state('app.login', {
		url: '/login',
		views: {
			"app": {
				controller: 'LoginCtrl',
				templateUrl: 'login/login.tpl.html'
			}
		}
	});

	$stateProvider.state('app.auth.logout', {
		url: '/logout',
		views: {
			"main": {
				template: ""
			}
		},
		onEnter: ["$state", "User", function($state, User) {
			User.logout();
			$state.go("app.homepage");
		}]
	});
})

.controller('LoginCtrl', function ($scope, User, $state, PageTitle) {
	PageTitle.setTitle("Login");


	$scope.login = login;

	function login(email, password) {
		$scope.error = "";
		User.login({
			email: email,
			password: password
		}).then(function(user) {
			if (user.isHero) {
				$state.go("app.auth.heroDashboard");
			} else {
				$state.go("app.auth.reporterDashboard");
			}
		}, function(error) {
			$scope.error = error.data.message;
		});
	}
})

;

