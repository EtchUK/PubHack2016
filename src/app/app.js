angular.module( 'BecomeAHero', [
	'templates-app',
	'templates-common',
	'ui.router',
	'ngAnimate',
	'restangular',
	'BecomeAHero.PageTitle',
	'BecomeAHero.Data.Settings',
	'BecomeAHero.Environment',
	'BecomeAHero.VendorOverrides.UiRouter',
	'BecomeAHero.Loading.Interceptor',
	'BecomeAHero.Loading.Service',
	'BecomeAHero.History',
	'BecomeAHero.Error',
	'BecomeAHero.Auth',
	'BecomeAHero.Login',
	'BecomeAHero.Homepage',
	'BecomeAHero.Register',
	'BecomeAHero.Data.User',
	'BecomeAHero.HeroDetail'
])


.run(function() {
	FastClick.attach(document.body);
})


.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('app', {
		abstract: true,
		url: '',
		views: {
			index: {
				template: '<div ui-view="app" autoscroll="false"></div>'
			}
		}
	});
	$urlRouterProvider.otherwise('/homepage');
})


.controller('AppCtrl', function ($scope, LoadingService, User, PageTitle, $state, $window) {

	$scope.loading = LoadingService;
	$scope.user = User;
	$scope.pageTitle = PageTitle;
	$scope.goToDashboard = goToDashboard;


	function goToDashboard() {
		var user = User.current();
		if (user.isHero) {
			$state.go("app.auth.heroDashboard");
		} else {
			$state.go("app.auth.reporterDashboard");
		}
	}

	$scope.state = $state;

	$scope.windowAlert = function(text){
		$window.alert(text);
	};

})

;

