angular.module('BecomeAHero.Icon', [])

.directive('icon', function() {
	return {
		scope: {
			name: "="
		},
		restrict: "E",
		replace: true,
		templateUrl: "icon/icon.tpl.html",
		link: function($scope, element, attrs) {
			$scope.iconHref = "#icon-" + $scope.name;
		}
	};
});