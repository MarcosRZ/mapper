var mAppControllers = angular.module('mAppControllers', [])

mApp.controller('newMarkerController', ['$scope', '$routeParams', 'MarkerService', function($scope, $routeParams, MarkerService) {

	// Create map with some presets
	function initialize() {
	  	$scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
		zoom: 3,
		center: {lat: -34.397, lng: 150.644}
	  });
	}

	initialize();

	// Create marker
	$scope.marker = new google.maps.Marker({
		position: new google.maps.LatLng(-25.363882,131.044922),
		map: $scope.map,
		draggable: true,
		title: 'Hello World!'
	});

	// Refresh lattitude and longitude fields on drag
	google.maps.event.addListener(
		$scope.marker,
		'drag',
		function(event) {	$scope.refreshMarkerPosition();		}
	);

	// Applied function to refresh Lat and Lon inputs on JS event
	$scope.refreshMarkerPosition = function (lat, lng) {
		$scope.$apply( function(){
			$scope.lat = $scope.marker.position.lat();
			$scope.lng = $scope.marker.position.lng();
		});
	}
	
	$scope.saveMarker = function(){

		var myMarker = { name: $scope.name, lat: $scope.lat, lng: $scope.lng }
		MarkerService.save({},myMarker,function(){console.log("Save Ok!")}, function(){console.err("Save Failed!")});
	}

	// Set Lat and Lon inputs at boot
	$scope.lat = $scope.marker.position.lat();
	$scope.lng = $scope.marker.position.lng();
	
}]);

mApp.controller('allMarkersController', ['$scope', '$routeParams', 'MarkerService', function($scope, $routeParams, MarkerService){

	// Create map with some presets
	function initialize() {
	  	$scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
			zoom: 3,
			center: {lat: -34.397, lng: 150.644}
	  	}
	}
	
	initialize();
	
	// Puts all markers in the map, and fits map bounds to all of them.
	var putMarkersInMap = function(){

		var bounds = new google.maps.LatLngBounds();

		$scope.markers.forEach(function(marker){
			var nextMarker = new google.maps.Marker({
				position: new google.maps.LatLng(marker.lat, marker.lng),
				map: $scope.map,
				draggable: false,
				title: marker.name
			})

			bounds.extend(nextMarker.getPosition());
		})

		$scope.map.fitBounds(bounds);
	}

	$scope.markers = MarkerService.query(putMarkersInMap);


}]);
