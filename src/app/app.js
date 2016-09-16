angular.module( 'BecomeAHero', [
	'templates-app',
	'templates-common',
	'ui.router',
	'ngAnimate',
	'restangular',
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
	'BecomeAHero.PageTitle',
	'BecomeAHero.Data.User'
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


.controller('AppCtrl', function ($scope, LoadingService, User, PageTitle) {

	$scope.loading = LoadingService;
	$scope.user = User;
	$scope.pageTitle = PageTitle;

})

;

