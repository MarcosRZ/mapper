var mAppControllers = angular.module('mAppControllers', [])

mApp.controller('newMarkerController', ['$scope', '$routeParams', 'MarkerService', function($scope, $routeParams, MarkerService) {

	
	// Create map with some presets
	$scope.i = function() {
                $scope.name = "New Pin";
                $scope.lat = -34.397;
                $scope.lng = 150.644;

		console.log("Initializing new marker controller")
	  	$scope.map = new google.maps.Map(document.getElementById('map-canvas'), {
		zoom: 3,
		center: { lat: $scope.lat, lng: $scope.lng }});  

	}

	$scope.i();

	// Create marker
	$scope.marker = new google.maps.Marker({
		position: new google.maps.LatLng(-25.363882,131.044922),
		map: $scope.map,
		draggable: true,
		title: $scope.markerTitle
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
	
	// POST request to save the new marker
	$scope.saveMarker = function(){
		var myMarker = { name: $scope.name, lat: $scope.lat, lng: $scope.lng }
		MarkerService.save({},myMarker,function(){console.log("Save Ok!")}, function(){console.err("Save Failed!")});
	}

	// Set Lat and Lon inputs at boot
	$scope.lat = $scope.marker.position.lat();
	$scope.lng = $scope.marker.position.lng();
	
}]);

mApp.controller('CategoriesController', ['$scope', '$routeParams', 'CategoriesService','MarkerService', function($scope, $routeParams, CategoriesService, MarkerService){

	$scope.googleMarkers = [];

	// Create a google marker with the given fillColor
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

		// First of all, clear the current markers (if any)
		$scope.clearGoogleMarkers();		

		var bounds = new google.maps.LatLngBounds();

		// Markers != googleMarkers. Markers is a domain model object and googleMarkers are objects based on this model.
		$scope.markers.forEach(function(marker){

			// Populate the googleMarkers list of the scope, and set its map (this puts the marker in the map)
			$scope.googleMarkers.push(new google.maps.Marker({
				position: new google.maps.LatLng(marker.lat, marker.lng),
				map: $scope.map,
				draggable: false,
				title: marker.name,
				icon: pinSymbol('#660066')
			}))

			//nextMarker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png')
			//nextMarker.setIcon('http://orig06.deviantart.net/74f1/f/2010/101/9/c/defcon_256_png_icon_by_kingreverant.png')
			bounds.extend($scope.googleMarkers[$scope.googleMarkers.length-1].getPosition());
		})

		// Once we've all markers, set the map bounds to fit them
		$scope.map.fitBounds(bounds);
	}
	
	// According to google maps JS API reference, the right way to delete a marker is by setting its map to null
	$scope.clearGoogleMarkers = function(){
		while ($scope.googleMarkers.length > 0)
			$scope.googleMarkers.pop().setMap(null);
	}
	
	// Request all categories to the backend
	$scope.loadCategories = function(callback){
		$scope.categories = CategoriesService.query({}, callback);
	}

	// Request all markers for the first category in the list (usefull at init)
        $scope.loadMarkersForFirstCategory = function(callback){
                console.log("Getting markers for category["+$scope.categories[0].id+"]")
                $scope.markers = MarkerService.query({id:$scope.categories[0].id}, callback);
        }

	// Request the markers list for a given category id
	$scope.loadMarkersForCategory = function(id, callback){
		console.log("Getting markers for category["+id+"]")
		$scope.markers = MarkerService.query({id:$scope.currentCategory.id}, callback);
	}

	// Request the markers for the current category (usefull when ng-change binding acts)
	$scope.loadMarkersForCurrentCategory = function(){
                console.log("Getting markers for category["+$scope.currentCategory+"]")
                $scope.markers = MarkerService.query({id:$scope.currentCategory}, putMarkersInMap);
	}

	// Start the app -> Load all categories.
        $scope.loadCategories();

}]);
