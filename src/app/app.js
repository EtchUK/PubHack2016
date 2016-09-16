angular.module( 'EtchBoilerplate', [
	'templates-app',
	'templates-common',
	'ui.router',
	'ngAnimate',
	'restangular',
	'EtchBoilerplate.Environment',
	'EtchBoilerplate.VendorOverrides.UiRouter',
	'EtchBoilerplate.Loading.Interceptor',
	'EtchBoilerplate.Loading.Service',
	'EtchBoilerplate.History',
	'EtchBoilerplate.Error',
	'EtchBoilerplate.Auth',
	'EtchBoilerplate.Login',
	'EtchBoilerplate.Register',
	'EtchBoilerplate.PageTitle',
	'EtchBoilerplate.Data.User'
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
	$urlRouterProvider.otherwise('/home');
})


.controller('AppCtrl', function ($scope, LoadingService, User, PageTitle) {

	$scope.loading = LoadingService;
	$scope.user = User;
	$scope.pageTitle = PageTitle;

})

;

