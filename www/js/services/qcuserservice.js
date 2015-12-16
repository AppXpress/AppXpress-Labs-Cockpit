/**
 * 
 */
angular.module('cockpit.services').factory('QcUserService', QcUserService);

QcUserService.$inject = [ '$http' ];

function QcUserService($http) {
	return {
		getAuditCount : function(authToken,orgName) {

			var authToken = authToken;
			
			console.log(authToken);
			// service call for angular
			var url = cockpit_config.cockpit_url +"/"+ cockpit_config.qc_user_design_name;
			var oql='orgName="'+orgName+'"';

			var req = {
				method : 'GET',
				url : url,
				headers : {
					'Authorization' : authToken,
					'Access-Control-Allow-Origin' : '*',
					'Content-Type' : cockpit_config.content_type
				},
				params : {
					dataKey : cockpit_config.cockpit_dataKey,
					oql : oql
				}
			}

			return $http(req);
		}
	}
}