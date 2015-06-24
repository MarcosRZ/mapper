var mAppServices = angular.module('mAppServices', ['ngResource']);

mAppServices.factory('maps', ['$resource',
	function($resource){
		return $resource('maps/:phoneId.json', {}, {
		query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
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
