angular.module('BecomeAHero.Register', [
	'ui.router',
	'BecomeAHero.Data.User',
	'BecomeAHero.PageTitle'
])

.config(function config( $stateProvider ) {
	$stateProvider.state('app.register', {
		url: '/register',
		views: {
			"app": {
				controller: 'RegisterCtrl',
				templateUrl: 'register/register.tpl.html'
			}
		}
	});
})

.controller('RegisterCtrl', function ($scope, User, $state, PageTitle) {
	PageTitle.setTitle("Register");

	$scope.register = register;

	
	function register(username, password, firstname, lastname) {
		$scope.error = "";
		var data = {
			username: username,
			password: password,
			firstname: firstname,
			lastname: lastname
		};
		
		User.post(data).then(function() {
			User.login({ username: username, password: password }).then(function() {
				$state.go("app.auth.heroDashboard");
			}, function(error) {
				$scope.error = JSON.stringify(error.data.errors);
			});
		}, function(error) {
			$scope.error = JSON.stringify(error.data.errors);
		});
	}	
})

;

