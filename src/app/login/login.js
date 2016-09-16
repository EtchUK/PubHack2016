angular.module('EtchBoilerplate.Login', [
	'ui.router',
	'EtchBoilerplate.Data.User',
	'EtchBoilerplate.PageTitle'
])

.config(function config( $stateProvider ) {
	$stateProvider.state('app.login', {
		url: '/login',
		views: {
			"app": {
				controller: 'LoginCtrl',
				templateUrl: 'login/login.tpl.html'
			}
		},
		resolve: {
			user: ["User", "$q", function(User, $q) {
				var deferred = $q.defer();
				User.getProfile().then(function(user) {
					deferred.resolve(user);
				}, function (error) {
					deferred.resolve(null);
				});
				return deferred.promise;
			}]
		},
		onEnter: ["$state", "user", function($state, user) {
			if (user) {
				$state.asyncGo("app.auth.home");
			}
		}],
		data: {
			title: "Login"
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
			User.logout().then(function() {
				$state.asyncGo("app.login");
			});
		}],
		data: {
			title: "Logout"
		}
	});
})

.controller('LoginCtrl', function ($scope, User, $state, PageTitle) {
	PageTitle.setTitle("Login");


	$scope.login = login;

	function login(username, password) {
		$scope.error = "";
		User.login({
			username: username,
			password: password
		}).then(function() {
			$state.go("app.auth.home");
		}, function(error) {
			$scope.error = error.data.message;
		});
	}
})

;

