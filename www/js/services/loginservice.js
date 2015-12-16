/**
 * services calls for login
 * 
 */

//angular.module('cockpit.service').factory('LoginService', LoginService);

//LoginService.$inject = [ '$q', '$rootScope', '$http', '$filter'];
angular.module('cockpit.services', [])

.factory('LoginService', function($http) {
	

	return {
		login : function(authToken) {

			var authToken = authToken;
			console.log(authToken);
			// service call for angular

			var req = {
				method : 'GET',
				url : cockpit_config.cockpit_url,
				headers : {
					'Authorization' : authToken,
					'Access-Control-Allow-Origin' : '*',
					'Content-Type' : cockpit_config.content_type
				},
				params : {
					dataKey : cockpit_config.cockpit_dataKey
				}
			}

			return $http(req);
		}
	}
})
