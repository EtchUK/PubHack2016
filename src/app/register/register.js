angular.module('BecomeAHero.Register', [
	'ui.router',
	'BecomeAHero.Data.User',
	'BecomeAHero.PageTitle'
])

.config(function config( $stateProvider ) {
	$stateProvider.state('app.register', {
		url: '/register?type',
		views: {
			"app": {
				controller: 'RegisterCtrl',
				templateUrl: 'register/register.tpl.html'
			}
		}
	});
})

.controller('RegisterCtrl', function ($scope, User, $state, PageTitle, $stateParams) {
	PageTitle.setTitle("Register");

	$scope.register = register;

	
	function register(email, password, name) {
		$scope.error = "";
		var data = {
			email: email,
			password: password,
			name: name,
			isHero: $stateParams.type === "hero",
			isReporter: $stateParams.type !== "hero",
			createdAt: new Date().toISOString()
		};
		
		User.post(data).then(function() {
			User.login({ email: email }).then(function() {
				if (data.isHero) {
					$state.go("app.auth.heroDashboard");
				} else {
					$state.go("app.auth.reporterDashboard");
				}
			}, function(error) {
				$scope.error = JSON.stringify(error.data.errors);
			});
		}, function(error) {
			$scope.error = JSON.stringify(error.data.errors);
		});
	}	
})

;

