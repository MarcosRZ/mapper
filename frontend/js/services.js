var mAppServices = angular.module('mAppServices', ['ngResource']);

mAppServices.factory('MarkerService', ['$resource',
	function($resource){
		return $resource('http://localhost:3000/api/categories/:id/markers', {}, {
		query: {method:'GET', isArray:true},
		save: {method:'POST'}
	});
}]);

mAppServices.factory('CategoriesService', ['$resource',
        function($resource){
		var res = $resource('http://localhost:3000/api/categories/:id', {}, {
                query: {method:'GET', isArray:true},
                save: {method:'POST'}});

		console.log(res)

                return res;
       } 
]);

/*
phonecatServices.factory('Phone', ['$resource',
	function($resource){
		return $resource('phones/:phoneId.json', {}, {
		query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
	});
}]);
*/
