/**
 * party services calls
 * 
 */

angular.module('cockpit.services').factory('PartyService', PartyService);

PartyService.$inject = [ '$http' ];

function PartyService($http) {
	return {
		getParty : function(authToken) {

			var authToken = authToken;
			
			console.log(authToken);
			// service call for angular
			var url = cockpit_config.cockpit_url + cockpit_config.party_list_uri;

			var req = {
				method : 'GET',
				url : url,
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
		},
		searchOrgSingleton : function(authToken) {

			var url = cockpit_config.cockpit_url + "/" + cockpit_config.org_search_singleton_design;
			var oqlStatement = 'status="active"';
			console.log(oqlStatement);
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
					oql : oqlStatement
				}
			}

			return $http(req);

		},
		getOrgInfo : function(authToken,orgId) {

			var url = cockpit_config.cockpit_url + "/" + cockpit_config.org_info_design;
			var oqlStatement = 'orgId="'+orgId+'" and status="Active"';
			console.log(oqlStatement);
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
					oql : oqlStatement
				}
			}

			return $http(req);

		}
	}
}
