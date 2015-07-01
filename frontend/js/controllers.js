var mAppControllers = angular.module('mAppControllers', [])

mApp.controller('newMarkerController', ['$scope', '$routeParams', 'MarkerService', function($scope, $routeParams, MarkerService) {

	// Create map with some presets
	$scope.i = function() {
		console.log("Initializing new marker controller")
	  	$scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
		zoom: 3,
		center: {lat: -34.397, lng: 150.644}
	  });
	}

	$scope.i();

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

mApp.controller('CategoriesController', ['$scope', '$routeParams', 'CategoriesService','MarkerService', function($scope, $routeParams, CategoriesService, MarkerService){

	function pinSymbol(color) {
		return {
		    path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
		    fillColor: color,
		    fillOpacity: 1,
		    strokeColor: '#000',
		    strokeWeight: 2,
		    scale: 1,
	   };
	}

	// Create map with some presets
	$scope.i = function() {
		console.log("initialize")
	  	$scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
			zoom: 3,
			center: {lat: -34.397, lng: 150.644}
	  	});
	}
        $scope.i();	
	// Puts all markers in the map, and fits map bounds to all of them.
	var putMarkersInMap = function(){

		var bounds = new google.maps.LatLngBounds();

		$scope.markers.forEach(function(marker){
			var nextMarker = new google.maps.Marker({
				position: new google.maps.LatLng(marker.lat, marker.lng),
				map: $scope.map,
				draggable: false,
				title: marker.name,
				icon: pinSymbol('#660066')
			})

			//nextMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
			//nextMarker.setIcon('http://orig06.deviantart.net/74f1/f/2010/101/9/c/defcon_256_png_icon_by_kingreverant.png')
			bounds.extend(nextMarker.getPosition());
		})

		$scope.map.fitBounds(bounds);
	}
	
	$scope.loadCategories = function(callback){
		$scope.categories = CategoriesService.query({}, callback);
	}

        $scope.loadMarkersForFirstCategory = function(callback){
                console.log("Getting markers for category["+$scope.categories[0].id+"]")
                $scope.markers = MarkerService.query({id:$scope.categories[0].id}, callback);
        }

	$scope.loadMarkersForCategory = function(id, callback){
		console.log("Getting markers for category["+id+"]")
		$scope.markers = MarkerService.query({id:$scope.currentCategory.id}, callback);
	}

        $scope.loadCategories($scope.loadMarkersForFirstCategory(putMarkersInMap));


//	$scope.markers = MarkerService.query(putMarkersInMap);

}]);
