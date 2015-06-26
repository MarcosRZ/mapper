var mApp = angular.module('mApp', [
	'ngRoute',
	'mAppControllers',
	'mAppServices'
]);

mApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'partials/all-markers.html',
			controller: 'allMarkersController'
		}).
		when('/create', {
			templateUrl: 'partials/create.html',
			controller: 'newMarkerController'
		}).
		otherwise({
			redirectTo: '/'
		});
}]);
