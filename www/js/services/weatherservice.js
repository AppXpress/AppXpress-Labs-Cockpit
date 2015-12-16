/**
 * 
 */
/**
 * party services calls
 * 
 */

angular.module('cockpit.services').factory('WeatherService', WeatherService);

WeatherService.$inject = [ '$http' ];

function WeatherService($http) {

	

	/*
	 * Getting weather Infomations from Open weather.
	 * by passing lat and long .
	 */
	function getWeatherInfo_($http,lat,lon) {
		var url = cockpit_config.open_weather_url;
		 
		
		var req = {
			method : 'GET',
			url : url,
			headers : {
				
				'Access-Control-Allow-Origin' : '*',
				'Content-Type' : cockpit_config.content_type
			},
			params : {
				lat : lat,
				lon : lon,
				appid : cockpit_config.open_weather_api_key
			}
		}

		return $http(req);

	}

	return {
		getWeatherInfo : function($http,lat,lon) {
			
			return getWeatherInfo_($http,lat,lon);

		}
	}
}