var mAppServices = angular.module('mAppServices', ['ngResource']);

mAppServices.factory('MarkerService', ['$resource',
	function($resource){
		return $resource('http://localhost:3000/api/markers', {}, {
		query: {method:'GET', params:{cat:'myMarkers'}, isArray:true},
		save: {method:'POST'}
	});
}]);

/*
phonecatServices.factory('Phone', ['$resource',
	function($resource){
		return $resource('phones/:phoneId.json', {}, {
		query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
	});
}]);
*/
