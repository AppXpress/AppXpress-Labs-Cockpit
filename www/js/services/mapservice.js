/**
 * party services calls
 * 
 */

angular.module('cockpit.services').factory('MapService', MapService);

MapService.$inject = [ '$http' ];

function MapService($http) {

	var $q_;

	/*
	 * Chain promises. And aggregate results. Call .then() on the return promise to access the
	 * geoLoations[].
	 */
	function chainHttpRequsts_(requests) {
		return $q_.all(requests).then(function(result) {
			// result contains all geocoded respones (lat, lon) values of each
			// requests.
			var geoLocations = [];
			angular.forEach(result, function(value) {
				geoLocations.push(value);
			});
			return geoLocations;
		});

	}

	return {
		getCordinates : function($q, httpRequests) {
			$q_ = $q;
			return chainHttpRequsts_(httpRequests);

		}
	}
}
/**
 * 
 */
