var mAppServices = angular.module('mAppServices', ['ngResource']);

mAppServices.factory('MarkerService', ['$resource',
	function($resource){
		return $resource('maps/:cat.json', {}, {
		query: {method:'GET', params:{cat:'myMarkers'}, isArray:true}
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
