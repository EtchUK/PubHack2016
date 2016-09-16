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

	
	function register(email, password, name) {
		$scope.error = "";
		var data = {
			email: email,
			password: password,
			name: name
		};
		
		User.post(data).then(function() {
			User.login({ email: email }).then(function() {
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

