angular
		.module('cockpit.controllers', [])

		.controller(
				'MapCtrl',
				function($scope, $ionicLoading, $http, $ionicSideMenuDelegate, $ionicScrollDelegate, LoginService,
						PartyService, MapService,WeatherService,QcUserService, $q, $timeout, uiGmapIsReady, $location, $ionicPopup, $interval) {

					var STATIC_MAP_CENTER_LAT_OFFSET = 20;
					
					$scope.comMarkers = new Array();
					$scope.comTempMarkers = new Array();
					$scope.STATIC_OFFSET_VALUE = 20;
					$scope.LAST_TOUCHED_MARKER = null;
					$scope.currentToggle = 2; // do not change
					$scope.toggleDisplay = "ion-arrow-right-b";
					$scope.placeholderMarker = "Search for marker";
					$scope.tooltip = new Array();
                    $scope.filterMenu = true;
					$scope.showTooltip = false;
					$scope.hideTooltipForSession = false;
					$scope.lastPointerMarker = null;
					$scope.OrgClicked=false;
					$scope.pdfDownloadURl="";

					// login backdrop
					// var loginBackdrop = document.getElementById('login_backdrop');
					// move(loginBackdrop).delay('5s').set('opacity', 0.6).duration('0.5s').end();

					// deafult animation
					move.ease = {
						'in' : 'ease-in',
						'out' : 'ease-out',
						'in-out' : 'ease-in-out',
						'snap' : 'cubic-bezier(0,1,.5,1)'
					};

					// stop drag open menu
					//$ionicSideMenuDelegate.canDragContent(false);

					// $scope.arrBindLocationData = [];
					$scope.mapClass = 'map_canvas';
					$scope.startValue = false;
					$scope.startInput = false;
					$scope.userAccount = false;
					$scope.iconAccount = false;
					$scope.searchResults = false;
					$scope.showFactorySearch = false;
					$scope.blockSaerchOrg = "";
					$scope.showOrgSearch = true;

					

					// SEARCH
					// this sucks. I hate filter.
					$scope.searchOrganization = function() {
						// slide results
						$scope.searchResults=true;
						if (true) {
					
							$scope.searchVal = "";
							$scope.searchResults = true;
							//var listResults = document.getElementById('listResults');
							//move(listResults).set('opacity', 0).duration('0.8s').y('-20').end();
							//move(listResults).set('opacity', 0.9).duration('0.8s').y('20').end();
							//

						} else {
							// TODO : SHOW NO RESULTS
						}
					}
					
					// search map markers
					$scope.mapMarkers = function() {
					$scope.searchFactory = "";
					if($scope.currentToggle == 2) {
						$scope.searchItelliReusults = false;
						$scope.searchMarkerResults = true;
						$scope.filterMenu = true;
					} else {
						$scope.searchMarkerResults = false;
						$scope.searchItelliReusults = true;
					}
					
					if($scope.sellerRole == false && $scope.buyerRole == false && $scope.factoryRole == false && $scope.otherRole == false) {
						$scope.showMessage("You must select atleast one organization type");
					}
					}

					// animate labs
					var iconMove = document.getElementById('erlenmeyer-icon');
					$scope.animateLabs = function() {
					var animateAngle = Math.floor(Math.random() * 180) + 1;
						move("#erlenmeyer-icon").rotate(animateAngle).end();
					}

					// map click
					/* $scope.mapSelect = function() {
						move(switchUser).set('opacity', 0).duration('0.5s').end();
						$scope.userAccount = false;
					} */

					// LOGIN
					// dont mess with this
					$scope.signIn = function() {
					
						$scope.mapClass = '';
						$scope.signinClass = 'login_click';
						$scope.startValue = true;
					

						// some cool animation
						var switchUser = document.getElementById('switch-user');
						move(switchUser).delay('2s').ease('in').y('70').end();

						// start button animate
						// animate start button
						// var startButton = document.getElementById('start-button');
						// move(startButton).set('background-color',
						// 'red').delay('5s').duration('5s').end();
						/*
						 * move(startButton) .delay('5s').set('background-color', 'red')
						 * .duration(1000) .end(function(){ move(startButton)
						 * .set('background-color', 'white') .end(); });
						 */

					}

					// SHOW MESSASGE
					$scope.showMessage = function(message) {
						var msg = document.getElementById('showError');
						move(msg).delay('0.2s').ease('in').y('32').end();
						$scope.displayError = message;
					}

					// HIDE MESSAGE
					$scope.hideMessge = function() {
                        var msg = document.getElementById('showError');
                        //console.log("msg " + msg.top);
                        //if (msg.top > 20) {
                            move(msg).delay('0.3s').ease('in').y('-32').end();
                            $scope.displayError = "";
                        //}
					}

					$scope.showSettings = function() {
						$scope.showMessage("We are still working on this");

						$timeout(function() {
							$scope.hideMessge();
						}, 3000);
					};

					// HIDE DETAILS
					$scope.hideDetailSection = function() {
					//$ionicSideMenuDelegate.toggleRight(false);
					$scope.showSidepanel(false);
					//var minButton = document.getElementById('minimize');
					//	move(minButton).delay('0.3s').ease('in').x('50').end();
					}

					// SCOPE VARIABLE
					$scope.start = 'selectHide';
					$scope.orgTypes = 'hideFilter';
					$scope.showContent = '';
					$scope.detailSection = '';
					$scope.detailContent = '';

					// SHOW SEARCH
					$scope.showSearch = function() {

						var buttons = document.getElementById('user-org-menu');
						var filterMenu = document.getElementById('user-filter-menu');

						console.log($scope.startInput);
						if ($scope.startInput == false) {
							// search
							move(buttons).ease('snap').x('522').end();
							// filter
							move(filterMenu).delay('0.5s').set('opacity', 0.9).duration('0.8s').y('20').end();
							$scope.startInput = true;
							console.log("Show Search");
						} else {
							// filter
							move(filterMenu).y('20').delay('0.2s').set('opacity', 0).end();
							// search
							move(buttons).delay('0.3s').ease('in').x('-511').end();
							$scope.startInput = false;
							console.log("hideSearch");
							$scope.searchResults = false;
							if ($scope.searchResults) {
								//var listResults = document.getElementById('listResults');
								//move(listResults).y('-20').set('opacity', 0).duration('0.8s').end();
							}
						}
						//$ionicSideMenuDelegate.toggleRight(false);
					$scope.showSidepanel(false);

						// hide
						var switchUser = document.getElementById('userSettings');
						move(switchUser).set('opacity', 0).duration('1s').end();
						$scope.userAccount = false;
					}

					// show account details
					$scope.showAccount = function() {
						var switchUser = document.getElementById('userSettings');
						if ($scope.userAccount == false) {

							move(switchUser).set('opacity', 0.9).duration('0.5s').end();
							$scope.userAccount = true;
						} else {
							move(switchUser).set('opacity', 0).duration('0.5s').end();
							$scope.userAccount = false;
						}

					}
					
					$scope.hideAccount = function(isHide) {
					if(isHide) {
						var switchUser = document.getElementById('userSettings');
						move(switchUser).set('opacity', 0).duration('0.5s').end();
						$scope.userAccount = false;
					}
					
					}

					/** ***************************************************************************** */
					/** DATA * */
					$scope.community = [];
					/*
					 * $scope.community = [{ "partyRoleCode": "Seller", "address": { "countryCode":
					 * "HK", "addressLine1": "12/F, Harbour Centre, 25 Harbour Road, Wanchai",
					 * "city": "Hong Kong" }, "name": "Esquel Enterprises Limited", "memberId":
					 * "5717989018006191", "contact": { }, latitude : 22.396428, longitude :
					 * 114.109497, latLang : null, info : { alerts : 'None', poCount : 5,
					 * "orderPropotion" : 20 } }, { "partyRoleCode": "Seller", "address": {
					 * "countryCode": "TH", "addressLine2": "Huaykwang", "postalCodeNumber":
					 * "10310", "addressLine1": "240/23 15th Floor Ayodhaya Tower, Ratchadapisek
					 * Road", "city": "Bangkok" }, "identification": { "Patagoniaid": "18145",
					 * "Patagoniafactoryid": "11323" }, "name": "Sheico (Thailand) Co., Ltd.",
					 * "memberId": "3717989018020436", "contact": { }, latitude : 13.756331,
					 * longitude : 100.501765, latLang : null, info : { alerts : 'None', poCount :
					 * 5, "orderPropotion" : 50 } }, { "partyRoleCode": "ReceivedFrom", "address": {
					 * "countryCode": "SV", "stateOrProvince": "SAN SALVADOR", "addressLine2":
					 * "CTGO. AL MERCADO DE", "addressLine1": "COL. JARDINES DE SAN MARCOS CALLE
					 * PRINCIPAL", "city": "SAN MARCOS" }, "identification": { "Patagoniafactoryid":
					 * "20528", "Patagoniaid": "20528" }, "name": "BROOKLYN MANUFACTURING, LTDA. DE
					 * C.V.", "memberId": "3717989018020468", "contact": { }, latitude : 29.883275,
					 * longitude : -97.941394, latLang : null, info : { alerts : 'None', poCount :
					 * 5, "orderPropotion" : 30 } }, { "partyRoleCode": "ReceivedFrom", "address": {
					 * "countryCode": "CN", "postalCodeNumber": "88899", "addressLine1": "123
					 * Factory Road", "city": "Guangzhou" }, "identification": {
					 * "Patagoniafactoryid": "24882" }, "name": "PatagoniaFactory1", "memberId":
					 * "3717989018018982", "contact": { }, latitude : 23.129110, longitude :
					 * 113.264385, latLang : null, info : { alerts : 'None', poCount : 5,
					 * "orderPropotion" : 20 } }, { "partyRoleCode": "ReceivedFrom", "address": {
					 * "countryCode": "VN", "addressLine2": "Cu Chi District", "addressLine1": "Unit
					 * 2 Cu Chi Town", "city": "Ho Chi Minh City" }, "identification": {
					 * "Patagoniafactoryid": "24453" }, "name": "Quang Viet Enterprise Co., Ltd.",
					 * "memberId": "3717989018018834", "contact": { }, latitude : 10.823099,
					 * longitude : 106.629664, latLang : null, info : { alerts : 'None', poCount :
					 * 5, "orderPropotion" : 20 } }, { "partyRoleCode": "ReceivedFrom", "address": {
					 * "countryCode": "CN", "addressLine2": "Jimo Industry Develop Zone",
					 * "addressLine1": "#97 Lao Shan Road", "city": "Qingdao" }, "identification": {
					 * "Patagoniafactoryid": "18693" }, "name": "Qingdao Youngone Sportswear Co.,
					 * Ltd.", "memberId": "3717989018018831", "contact": { }, latitude : 36.067117,
					 * longitude : 120.382612, latLang : null, info : { alerts : 'None', poCount :
					 * 5, "orderPropotion" : 20 } }, { "partyRoleCode": "Buyer", "address": {
					 * "countryCode": "US", "stateOrProvince": "CA", "postalCodeNumber": "93001",
					 * "addressLine1": "259 W. Santa Clara", "city": "Ventura" }, "identification": {
					 * "Patagoniaid": "Patagonia" }, "name": "Patagonia", "memberId":
					 * "5717989018011581", "contact": { }, latitude : 34.274646, longitude :
					 * -119.229032, latLang : null, info : { alerts : 'None', poCount : 500,
					 * "orderPropotion" : 20 } }, { "partyRoleCode": "LogisticsProvider", "address": {
					 * "countryCode": "US", "stateOrProvince": "CA", "postalCodeNumber": "93001",
					 * "addressLine1": "259 W. Santa Clara", "city": "Ventura" }, "identification": {
					 * "Patagoniaid": "Patagonia" }, "name": "Patagonia", "memberId":
					 * "5717989018011581", "contact": { }, latitude : 34.274646, longitude :
					 * -119.229032, latLang : null, info : { alerts : 'None', poCount : 5,
					 * "orderPropotion" : 20 } }];
					 */

					$scope.filter = {
						buyer : true,
						seller : true,
						factory : true,
						other : false,
						order : false,
						country : false
					};

					$scope.location = {
						address : '',
						latitude : 0,
						longitude : 0,
						latLang : null,
						info : {
							alerts : 'None',
							poCount : 5
						}
					};
					$scope.organizations = [];
					/*
					 * $scope.organizations = [{ name : "Aidas", memberId : "1234-5678-9012-3456" }, {
					 * name : "Nike", memberId : "4444-1234-4532-2139" }, { name : "Puma", memberId :
					 * "1111-2222-3333-4444" }];
					 */

					$scope.org = {
						name : "Aidas",
						memberId : "1234-5678-9012-3456"
					};

					/** ***************************************************************************** */

					$scope.clickedOrg = {};

					// Map customize
					$scope.mapCreated = function(map) {

						var styles = [
						/*
						 * { stylers: [ { hue: "#00ffe6" }, { saturation: -20 } ] },
						 */

						{
							featureType : "water",
							elementType : "all",
							stylers : [

							{
								color : "#1c334b"
							}, {
								saturation : 0
							} ]
						}, {
							featureType : "road",
							elementType : "labels",
							stylers : [ {
								visibility : "off"
							} ]
						}, {
							featureType : "landscape.natural.landcover",
							elementType : "all",
							stylers : [ {
								color : "#daddd6"
							},
							/* { hue : "#aaff00" }, */
							{
								saturation : 0
							}

							]
						}, {
							featureType : "landscape.natural.terrain",
							elementType : "all",
							stylers : [ {
								color : "#daddd6"
							}, {
								hue : "#aaff00"
							}, {
								saturation : -22
							}

							]
						} /*
							 * ,{ featureType: "landscape.natural", elementType: "geometry.fill",
							 * stylers: [ { color: "#f3ffea" }, { saturation : 1 } ] }
							 */
						];

						// community sort
						$scope.community = $scope.community.sort(function(a, b) {

							var communityA = a.name.toLowerCase();
							var communityB = b.name.toLowerCase();

							if (communityA > communityB) return 1;
							if (communityA < communityB) return -1;
							return 0;
						});

						map.setOptions({
							styles : styles
						});
						var opt = {
							minZoom : 2,
							//maxZoom : 9,
							mapTypeControl: false,
		   
							   panControl: false,
							   streetViewControl: false,
							   zoomControl: true,
							   zoomControlOptions: {
							   style: google.maps.ZoomControlStyle.LARGE,
					position: google.maps.ControlPosition.TOP_RIGHT
							   }

						};
						map.setOptions(opt);

						/** ***************************************************************************** */
						/** EXPERIMENTAL * */
						/** lets see whether we can have shipping routes and transits * */

						var gtn_shipping_route = [ new google.maps.LatLng(37.772323, -122.214897),
								new google.maps.LatLng(21.291982, -157.821856),
								new google.maps.LatLng(10.823099, 106.629664) ];
						var path = new google.maps.Polyline({
							path : gtn_shipping_route,
							geodesic : true,
							strokeColor : '#FF0000',
							strokeOpacity : 1.0,
							strokeWeight : 2
						});

						// path.setMap(map);

						/** ************ */

						$scope.map = map;

						// DONT LIKE
						$scope.refreshFilter();
					};

					/** ***************************************************************************** */
					$scope.currentLocation = function() {
						console.log("Centering");
						if (!$scope.map) {
							return;
						}
						// FIXME $ionicLoading instance.hide() has been deprecated. Use
						// $ionicLoading.hide()
						$scope.loading = $ionicLoading.show({
							content : 'Getting current location...',
							showBackdrop : false
						});

						navigator.geolocation.getCurrentPosition(function(pos) {
							console.log('Got pos', pos);
							$scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
							$scope.loading.hide();
						}, function(error) {
							alert('Unable to get location: ' + error.message);
						});
					};

					$scope.searchLocation = function() {
						console.log("Searching");
						if (!$scope.map || ($scope.location.address.trim() === "")) {
							return;
						}

						$scope.loading = $ionicLoading.show({
							content : 'Getting location for ' + $scope.location.address,
							showBackdrop : false
						});

						$http.get('http://maps.googleapis.com/maps/api/geocode/json', {
							params : {
								address : $scope.location.address,
								sensor : false
							}
						}).success(
								function(response) {

									var pos = response.results[0].geometry.location;
									console.log('Got pos', pos);

									$scope.location.latitude = pos.lat;
									$scope.location.longitude = pos.lng;
									$scope.location.latLang = new google.maps.LatLng($scope.location.latitude,
											$scope.location.longitude);

									$scope.map.setCenter($scope.location.latLang);

									var marker = new google.maps.Marker({
										position : $scope.location.latLang,
										map : $scope.map,
										title : $scope.location.address
									});

									var popupHtmlText = '<b>' + $scope.location.address + '</b>' + '<br />'
											+ $scope.location.latitude + ',' + $scope.location.longitude + '<hr />'
											+ '<b>Alerts: </b>' + $scope.location.info.alerts + '<br />'
											+ '<b>Pending Orders: </b>' + $scope.location.info.poCount;

									var infowindow = new google.maps.InfoWindow({
										content : popupHtmlText
									});

									google.maps.event.addListener(marker, 'click', function() {
										infowindow.open($scope.map, marker);
									});

									infowindow.open($scope.map, marker); // Default Open Info
									// Popup

									$scope.loading.hide();

								}).error(function(error) {
							alert('Unable to get location: ' + error.message);
						});

					};

					// FILTER
					$scope.refreshFilter = function() {
						console.log("Applying Filters");
						if (!$scope.map) {
							return;
						}

						$scope.loading = $ionicLoading.show({
							content : 'Applying Filters...',
							showBackdrop : false
						});

						var countryCodeList = [];
						for (var index = 0; index < $scope.community.length; index++) {
							var org = $scope.community[index];

							if ($scope.filter.country) {
								$scope.showMessage('Feature not available in beta version');
								// countryCodeList.push("'"+org.address.countryCode+"'");
							}
							var customIcon;

							if (org.marker) {
								org.marker.setMap(null);
							}

							var symbolScale = 8;

							if ($scope.filter.order) {
								$scope.showMessage('Feature not available in beta version');
								// symbolScale = org.info.orderPropotion;
								console.log("orderPropotion" + $scope.filter.order);
							}

							var draw = false;
							var labelName = org.name;
							// if($scope.filter.buyer && org.partyRoleCode === "Buyer") {
							// draw = true;
							// customIcon = new google.maps.MarkerImage(
							// "http://www.comfortableshoes.com/media/catalog/category/patagonia-logo.jpg",
							// null, /* size is determined at runtime */
							// null, /* origin is 0,0 */
							// null, /* anchor is bottom center of the scaled image */
							// new google.maps.Size(91, 34)
							// ); /* {
							// path : google.maps.SymbolPath.CIRCLE,
							// strokeColor: '#FF0000',
							// strokeOpacity: 0.8,
							// strokeWeight: 2,
							// fillColor: '#FF0000',
							// fillOpacity: 0.35,
							// scale: 10,
							// } */
							// labelName = '';
							// }

							if ($scope.filter.seller && org.partyRoleCode === "Buyer") {
								draw = true;
								customIcon = {
									path : google.maps.SymbolPath.CIRCLE,
									scale : symbolScale,
									fillOpacity : 0.5,
									fillColor : '#c13236',
									strokeOpacity : 0.9,
									strokeColor : '#c13236',
									strokeWeight : 2
								}
							}

							if ($scope.filter.seller && org.partyRoleCode === "Seller") {
								draw = true;
								customIcon = {
									path : google.maps.SymbolPath.CIRCLE,
									scale : symbolScale,
									fillOpacity : 0.5,
									fillColor : '#dd7b00',
									strokeOpacity : 0.9,
									strokeColor : '#bc6900',
									strokeWeight : 2
								}
							}

							if ($scope.filter.factory && org.partyRoleCode === "ReceivedFrom") {
								draw = true;
								customIcon = {
									path : google.maps.SymbolPath.CIRCLE,
									scale : symbolScale,
									fillOpacity : 0.5,
									fillColor : '#3d8a94',
									strokeOpacity : 0.8,
									strokeColor : '#2c656c',
									strokeWeight : 2
								}
							}

							if ($scope.filter.other && (org.partyRoleCode !== "Buyer")
									&& (org.partyRoleCode !== "Seller") && (org.partyRoleCode !== "ReceivedFrom")) {
								draw = true;
								customIcon = {
									path : google.maps.SymbolPath.CIRCLE,
									scale : symbolScale,
									fillOpacity : 0.5,
									fillColor : '#717171',
									strokeOpacity : 0.8,
									strokeColor : '#717171',
									strokeWeight : 2
								}
							}

							if (draw) {

								org.latLang = new google.maps.LatLng(org.latitude, org.longitude);

								// $scope.map.setCenter($scope.location.latLang);

								/*
								 * marker = new google.maps.Marker({ position: org.latLang, map:
								 * $scope.map, title: org.name });
								 */

								org.marker = new MarkerWithLabel({
									position : org.latLang,
									draggable : false,
									map : $scope.map,
									labelContent : labelName,
									labelAnchor : new google.maps.Point(30, 20),
									labelClass : "labels", // the CSS class for the label
									labelStyle : {
										opacity : 0
									},
									icon : customIcon,
								});

								org.marker.org = org;

								google.maps.event.addListener(org.marker, 'click', function() {
									// org.infowindow.open($scope.map, marker);
									console.log("marker clicked");

									this.org.info = { // TODO : Remove this hard coded data at the
										// time of integration
										lastOrder : '2015-08-13',
										nextOrder : '2015-09-01',
										riskStatus : 'N/A',
										auditStatus : 'N/A',
										completedOrderVolume : 2430,
										pendingOrderVolume : 36,
										totalFinancing : 'US$ 2,500,000.00',
										completedSupportCases : 17,
										pendingSupportCases : 0,
										chartData : [ // TODO : Random numbers between 10-110 are
										// assigned for values for the static demo
										{
											value : Math.floor((Math.random() * 100) + 10),
											color : '#F7464A',
											highlight : '#FF5A5E',
											label : 'Orders'
										}, {
											value : Math.floor((Math.random() * 100) + 10),
											color : '#46BFBD',
											highlight : '#5AD3D1',
											label : 'Invoices'
										}, {
											value : Math.floor((Math.random() * 100) + 10),
											color : "#4D5360",
											highlight : "#616774",
											label : 'Payments'
										}, {
											value : Math.floor((Math.random() * 100) + 10),
											color : '#FDB45C',
											highlight : '#FFC870',
											label : 'Pack Plans'
										}, {
											value : Math.floor((Math.random() * 100) + 10),
											color : '#D4CCC5',
											highlight : '#E2EAE9',
											label : 'Other'
										} ]
									}; // TODO : Remove this at the time of integration

									$scope.clickedOrg = this.org;
									//$ionicSideMenuDelegate.toggleRight(true);
									$scope.showSidepanel(true);

									// $scope.detailSection = 'showDetails';
									// $scope.$apply();
								});

								// org.infowindow.open($scope.map, org.marker); // Default Open Info
								// Popup
							}

						} // end for

						console.log(countryCodeList.toString());
						var strCountryCodes = '';
						/*
						 * for(var a = 0; a < countryCodeList.length; a++) { strCountryCodes
						 * +="'"+countryCodeList[a]+"',"; }
						 */

						console.log("COUNTRY" + $scope.filter.country);
						if ($scope.filter.country) {
							var string_where = "ISO_2DIGIT IN (" + countryCodeList.toString() + ")";

							/*
							 * var world_geometry = new google.maps.FusionTablesLayer({ query: {
							 * select: 'geometry', from: '1N2LBk4JHwWpOY4d9fobIn27lfnZ5MDy-NoqqRpk',
							 * where: string_where, }, map: $scope.map, suppressInfoWindows: true, /*
							 * styles: [{ where: "ISO_2DIGIT IN ('US', 'GB', 'DE')", polygonOptions: {
							 * fillColor: "#ffd85f", strokeColor: "#bcbcbc", fillOpacity: "0.7" } }, {
							 * where: "ISO_2DIGIT IN ('CN')", polygonOptions: { fillColor:
							 * "#ffd85f", } } ]
							 */
							/*
							 * /* }
							 *  );
							 */
						}
						$scope.loading.hide();
					};

					// $scope.setData = function(index) {
					// console.log("setData" + index + " "+$scope.arrBindLocationData[index]);
					// return $scope.arrBindLocationData[index];
					// }

					/** ***************************************************************************** */

					$scope.showCommunity = function() {

					
						$scope.loading = $ionicLoading.show({
							content : 'Getting Community Locations...',
							showBackdrop : false
						});

						$scope.community = [];

						$scope.loading.hide();
					};

					// Chart Options
					$scope.chartOptions = {

						// Sets the chart to be responsive
						responsive : true,

						// Boolean - Whether we should show a stroke on each segment
						segmentShowStroke : true,

						// String - The colour of each segment stroke
						segmentStrokeColor : '#fff',

						// Number - The width of each segment stroke
						segmentStrokeWidth : 2,

						// Number - The percentage of the chart that we cut out of the middle
						percentageInnerCutout : 50, // This is 0 for Pie charts

						// Number - Amount of animation steps
						animationSteps : 100,

						// String - Animation easing effect
						animationEasing : 'easeOutBounce',

						// Boolean - Whether we animate the rotation of the Doughnut
						animateRotate : true,

						// Boolean - Whether we animate scaling the Doughnut from the centre
						animateScale : false,

						// String - A legend template
						legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'

					};
					
					$scope.buyerRole = true;
					$scope.sellerRole = true;
					$scope.factoryRole = true;
					$scope.otherRole = false;
					$scope.orderRole = false;
					$scope.countryRole = false;

					// getting the username password from localstorage

					$scope.userName = localStorage.getItem("username");
					$scope.password = localStorage.getItem("password");

					//$scope.userName = "demo1@cockpit";
					//$scope.password = "test1234";
					$scope.errorMessage = "";

					$scope.login = function(userName, Password) {
					
					
						// display loading
						$ionicLoading.show({
							content : 'Loading!',
							animation : 'fade-in',
							showBackdrop : true,
							maxWidth : 400,
							showDelay : 0
						});

						$scope.userName = userName;
						$scope.password = Password;
						$scope.loginError = false;
					
						console.log("LOGIN CALLED");

						// storing in local storage

						localStorage.setItem("username", $scope.userName);
						localStorage.setItem("password", $scope.password);

						var result = userName.split("@");

						if (result.length > 1) {
							// if the username have a @ sign validate if it's a admin user.
							// "cockpit" value from config file cockpit_config.adminUserURL

							if (result[1] == cockpit_config.adminUserURL) {
								// redirect to admin user URL
								$scope.loginForAdminUsers(userName, Password);

							} else {
								// Common user username can have @ value.
								$scope.loginForCommonUsers(userName, Password);
							}

						} else {
							// redirect to common user login.
							$scope.loginForCommonUsers(userName, Password);
						}

					};

					// function for admin users login.
					$scope.loginForAdminUsers = function(userName, Password) {
					
						console.log("admin users login");
						// creating a user object
						var obj = {
							userName : userName,
							password : Password,
							eid : null
						};
						var authToken = encodeHeader(obj.userName, obj.password, obj.eid);
						LoginService.login(authToken).success(function(data, status, headers, config) {
							// $scope.showMessage("Show errors and warnings here");
							// getting the authresponse from header and assign back to local storage
							// authToken.
							var header = headers();
							//var authResponse = header.authorization;
							var authResponse =authToken;
							// stroing auth response in local storage
							localStorage.setItem(cockpit_config.local_storage_auth_token_key, authResponse);

							// fetching list of access objects for this login.
							var accessObjectArray = data.objectType;
							var boolPermission = false;
							// to check login have permission to org search singleton object .. if
							// not it will redirect to common user login.
							for (var i = 0; i < accessObjectArray.length; i++) {
								if (accessObjectArray[i] == cockpit_config.org_search_singleton_design) {
									boolPermission = true;
								}
							}

							if (boolPermission) {
								// successfull admin user login
								console.log("successfull admin login");
								// loading seach orgs function
								$scope.loadSearchSingletonObjects();
							} else {
								// redirect to common user login.
								$scope.loginForCommonUsers(userName, Password);
							}

						}).error(function(data, status, headers, config) {
							$ionicLoading.hide();
							$scope.loginError = true;
							$scope.errorMessage = "Invalid username or password";
							console.log("username / password invalid.");
							console.log(headers());
							console.log(status);
							console.log(data);
							
						});

					};

					// function for common user login.
					$scope.loginForCommonUsers = function(userName, Password) {

						// creating a user object
						var obj = {
							userName : userName,
							password : Password,
							eid : null
						};
						var authToken = encodeHeader(obj.userName, obj.password, obj.eid);
						// login service call in loginservice.js
						LoginService.login(authToken).success(function(data, status, headers, config) {
							console.log(headers());
							var header = headers();
							// getting the authresponse from header and assign back to local storage
							// authToken.
							//var authResponse = header.authorization;
							var authResponse =authToken;
							// stroing auth response in local storage
							localStorage.setItem(cockpit_config.local_storage_auth_token_key, authResponse);

							// calling getparties method.
							$scope.getparties();

						}).error(function(data, status, headers, config) {
							$ionicLoading.hide();
							$scope.loginError = true;
							$scope.errorMessage = "Username/password invalid";
							console.log("Username/password invalid.");
						});

					};

					// function to retrive the parties
					$scope.getparties = function() {
						// get auth token from local storage
						var authToken = localStorage.getItem(cockpit_config.local_storage_auth_token_key);

						PartyService.getParty(authToken).success(function(data, status, headers, config) {
							console.log(data.result);
							// $scope.community =data.result;

							// calling get Gps
							$scope.getcordinates(data.result);
						}).error(function(data, status, headers, config) {
							$ionicLoading.hide();
							$scope.loginError = true;
							$scope.errorMessage = "Failed to fetch partylist";
							console.log("Failed to fetch partylist");
							$scope.showMessage("Failed to fetch partylist.");

							$timeout(function() {
								$scope.hideMessge()
							}, 3000);

						});
					};

					// function to retive cordinates from partylist address.
					$scope.getcordinates = function(partyListArray) {

						var httpGetRequests = new Array();
						var url = cockpit_config.google_map_javascript_api_url;

						for (var i = 0; i < partyListArray.length; i++) {
							var addressobj = partyListArray[i].address;

							var addressString = addressobj.addressLine1 + " " + addressobj.city + " "
									+ addressobj.countryCode + " " + addressobj.postalCodeNumber + " "
									+ addressobj.stateOrProvince;

							var getReq = {
								method : 'GET',
								url : url,
								headers : {
									'Access-Control-Allow-Origin' : '*',
									'Content-Type' : 'application/json'
								},
								params : {
									address : addressString,
									sensor : false
								}
							}
							httpGetRequests.push($http(getReq));
						}

						MapService.getCordinates($q, httpGetRequests).then(function(res) {
							console.log(res);

							// adding the cordinates to partylist Array

							// adding cordinates to the partylist object.
							var tempDataArray = new Array();
							for (var i = 0; i < partyListArray.length; i++) {

								if (res[i].statusText == "OK") {

									// check if there are results (lat, long values) from google
									// maps conversion

									if (res[i].data.results.length > 0) {

										console.log(res[i].data.results[0].geometry.location.lat);

										partyListArray[i].latitude = res[i].data.results[0].geometry.location.lat;
										partyListArray[i].longitude = res[i].data.results[0].geometry.location.lng;
										partyListArray[i].latLang = null;
										partyListArray[i].identification = {
											"Patagoniaid" : "Patagonia"
										};
										partyListArray[i].info = {
											alerts : 'None',
											poCount : 5,
											"orderPropotion" : 20
										};
										var cords = new Object();
										//cords.show = 'false';
										cords.id = partyListArray[i].uid;
										var cor = new Object();
										cor.latitude = partyListArray[i].latitude;
										cor.longitude = partyListArray[i].longitude;
										cords.coords = cor;
										partyListArray[i].coords = cor;
										partyListArray[i].icon = $scope.getMarkerCss(partyListArray[i].partyRoleCode);
										partyListArray[i].filterValue = $scope.setFilter(partyListArray[i].partyRoleCode);
										
										
										
										tempDataArray.push(partyListArray[i]);
										

									} else {
										// if there are no lat,lon from google, harcode to 0
										// partyListArray[i].lat= 0;
										// partyListArray[i].lon = 0;

										// deleting the party list from array to avoid null pointers
										// in the googlemap.
										// delete partyListArray[i];
										// partyListArray.splice(i);
										
										

									}

								} else {
									$ionicLoading.hide();
									$scope.loginError = true;
									$scope.errorMessage = "Failed to fetch data from google mapAPI";
									console.log("Failed to fetch data from google mapAPI");
									$scope.showMessage("Failed to fetch data from google mapAPI");

									$timeout(function() {
										$scope.hideMessge()
									}, 3000);
								}
							}

							// assign data to community array.
							console.log($scope.community);
							$scope.community = tempDataArray;
							$scope.comMarkers = tempDataArray;
							console.log($scope.community);
							$ionicLoading.hide();
							// loading map
							$scope.mapClass = '';
							$scope.signinClass = 'login_click';
							$scope.startValue = true;

							// some cool animation
							var switchUser = document.getElementById('switch-user');
							move(switchUser).delay('2s').ease('in').y('70').end();
							$scope.community = tempDataArray;
							$scope.comMarkers = tempDataArray;
							
						/*	$scope.refreshFilter();
							// loading map
							$scope.mapClass = '';
							$scope.signinClass = 'login_click';
							$scope.startValue = true;

							// some cool animation
							var switchUser = document.getElementById('switch-user');
							move(switchUser).delay('2s').ease('in').y('70').end();

							// FIXME not working
							var resetMap = document.getElementById('reset-map');
							move(resetMap).delay('3s').ease('in').y('70').end();*/

						});
					};

					
					// function to load serach orgs objects for admin login.
					$scope.loadSearchSingletonObjects = function() {
						// get auth token from local storage
						var authToken = localStorage.getItem(cockpit_config.local_storage_auth_token_key);
						console.log(authToken);
						PartyService.searchOrgSingleton(authToken).success(function(data, status, headers, config) {
							console.log(data.result[0].instances);
							// initializing organizations search array
							$scope.organizations = data.result[0].instances;
							$ionicLoading.hide();
							// loading map
							$scope.mapClass = '';
							$scope.signinClass = 'login_click';
							$scope.startValue = true;

							// some cool animation
							var switchUser = document.getElementById('switch-user');
							move(switchUser).delay('2s').ease('in').y('70').end();
 

						}).error(function(data, status, headers, config) {
							$ionicLoading.hide();
							$scope.loginError = true;
							$scope.errorMessage = "Failed to fetch Org search objects";
							console.log("Failed to fetch Org search objects");
							$scope.showMessage("Failed to fetch Org search objects.");

							$timeout(function() {
								$scope.hideMessge()
							}, 3000);
						});
					};

					// function to fetch list of org's according to user slection
					$scope.loadOrgInfo = function(orgId, searchVal) {
					console.log("CLICKED BUYER");
						$scope.searchFactory = "";
						$scope.selectedOrg = searchVal;
						$scope.searchResults = false;
						$scope.pdfDownloadURl=orgId+".pdf";
						// display loading
						$ionicLoading.show({
							content : 'Loading!',
							animation : 'fade-in',
							showBackdrop : true,
							maxWidth : 400,
							showDelay : 0
						});

						// get auth token from local storage
						var authToken = localStorage.getItem(cockpit_config.local_storage_auth_token_key);
						// var orgId="5555-6666-7777-8888";
						var orgId = orgId;
						PartyService.getOrgInfo(authToken, orgId).success(function(data, status, headers, config) {

							console.log(data.result);
							//$scope.buyerRole = true;
							//$scope.sellerRole = true;
							//$scope.factoryRole = true;
							//$scope.otherRole = false;
							//$scope.orderRole = false;
							//$scope.countryRole = false;
							$scope.loadOrgsInMap(data.result, searchVal);
							$scope.showFactorySearch = true; // show factory search
						    
						    $scope.showOrgSearch = false; // hide org search
						    $scope.blockSaerchOrg= "blockSaerchOrg";
							//$scope.showCockpitToolTip(100,200,'Tap here to search by #tags',0);
							if($scope.hideTooltipForSession != true) {
								$scope.showTooltip = true;
								$scope.hideTooltipForSession = true;
							}

						}).error(function(data, status, headers, config) {
							$ionicLoading.hide();
							$scope.loginError = true;
							$scope.errorMessage = "Failed to fetch Org info";
							console.log("Failed to fetch Org info");
							$scope.showMessage("Failed to fetch Org info.");

							$timeout(function() {
								$scope.hideMessge()
							}, 3000);

						});

					};
					
					// The mapping between latitude, longitude and pixels is defined by the web
					// mercator projection.
					function project(t){var a=256,n=Math.sin(t.lat()*Math.PI/180);return n=Math.min(Math.max(n,-.9999),.9999),new google.maps.Point(a*(.5+t.lng()/360),a*(.5-Math.log((1+n)/(1-n))/(4*Math.PI)))}
					
					
					/** PULSATE THE MARKER **/
					$scope.pulsateMarker = function(uid, selectedMarker) {
						$scope.searchMarkerResults = false;
					
						console.log("latitude :"+ selectedMarker.latitude + "longitude :"+selectedMarker.longitude + "memberId "+ selectedMarker.memberId);
					
					// filter search
					$scope.searchFactory = selectedMarker.name;
					
					// animate the map baby
					var latLng = new google.maps.LatLng(selectedMarker.latitude, selectedMarker.longitude);
					
					// copy the marker before modify
 					var staticMarker=$scope.comMarkers[uid].icon;
					
					// custom crap THIS WORKS
					//$scope.comMarkers[uid].icon= {path:google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,scale:8,fillOpacity:7,fillColor:"#ff9436",strokeOpacity:.9,strokeColor:"#ff5612",strokeWeight:1};
					/** START THE CRAZY LOGIG **/
					
					/*
					if($scope.lastPointerMarker != undefined && $scope.lastPointerMarker.uid != undefined && $scope.lastPointerMarker != null) {
					// reset marker
					console.log("Yepee resetting marker " + $scope.lastPointerMarker.uid + "current marker " + $scope.comMarkers[uid].uid);
					var previousIcon = $scope.lastPointerMarker.icon;
					var previousUid = $scope.lastPointerMarker.uid;
					console.log("FFSSFS" +previousIcon.scale);
					customIcon={path:google.maps.SymbolPath.CIRCLE,scale:previousIcon.scale,fillOpacity:.7,fillColor:previousIcon.fillColor,strokeOpacity:.9,strokeColor:previousIcon.strokeColor,strokeWeight:previousIcon.strokeWeight};
					console.log("CUSTOMICON" + JSON.stringify(customIcon));
					
					// reset previous marker
					$scope.comMarkers[Number(previousUid)].icon = customIcon={path:google.maps.SymbolPath.CIRCLE,scale:previousIcon.scale,fillOpacity:.7,fillColor:previousIcon.fillColor,strokeOpacity:.9,strokeColor:previousIcon.strokeColor,strokeWeight:previousIcon.strokeWeight};
					console.log("AFTE RRESETTING " + JSON.stringify($scope.comMarkers[Number(previousUid)].icon));
						$scope.lastPointerMarker = $scope.comMarkers[uid]; // update last selected marker
					} else {
						$scope.lastPointerMarker = $scope.comMarkers[uid];
					}
					*/
					/** END CRAZY LOGIC **/
					
					// DO NOT EDIT THIS
					$scope.zoomOutOfMarker(2);
					$scope.markerClicker(uid, selectedMarker, true); // update current marker


					 // hold previous marker
					//$scope.comMarkers[uid].animation = { animation: google.maps.Animation.BOUNCE};
					
					
					// Lets try another brave animation
					//$scope.com.options = { animation: new window.google.maps.Animation.BOUNCE };
					
					// zoom in like sliding
					/*var zoomMapOut = $scope.map.zoom;
					console.log("ZOOM VALUE "+zoomMapOut);
					$interval(function() {
							  if(zoomMapOut > 0) {
							  $scope.map = {
							  zoom : zoomMapOut
							  }
							  zoomMapOut--;
							  }
							  }, 500, 8);
					*/

						//if($scope.map.zoom > 2) {

						//}

					$timeout(function() {
						// Yes it works
						var numberOfPulse = 0;
						$interval(function () {
							var rndmOrder = 8;
							if (numberOfPulse < 19) {
								rndmOrder = Math.floor(Math.random() * 30) + 12;
							} else {
								rndmOrder = 8;
							}
							$scope.comMarkers[uid].icon = {
								path: google.maps.SymbolPath.CIRCLE,
								scale: rndmOrder,
								fillOpacity: staticMarker.fillOpacity,
								fillColor: staticMarker.fillColor,
								strokeOpacity: staticMarker.strokeOpacity,
								strokeColor: staticMarker.strokeColor,
								strokeWeight: staticMarker.strokeWeight
							};
							numberOfPulse++;
						}, 100, 20);
					},500);

				 
					
					// zoom in like sliding
					/*var zoomMap = 1;
					$interval(function() {
							  $scope.map = {
								 zoom : zoomMap
							  }
							  zoomMap++;
							  }, 500, 8);
				 */

					
					
					/* $timeout(function() {
							 $scope.comMarkers[uid].icon = staticMarker;
								}, 5000); */
					
 					/* var worldCoordinate = project(latLng);
					
																var x = Math.floor(worldCoordinate.x * 2);
					var y = Math.floor(worldCoordinate.y * 2);
					
					$scope.pixelCord = "top:"+ x+"px;left:"+y+"px;";
					console.log("PIXEL Cord "+$scope.pixelCord);
					*/
					}

					$scope.switchBackToOrgSearch = function () {
						$scope.comMarkers = [];
						$scope.searchResults = true;
						$scope.showFactorySearch = false; // show factory search
						$scope.searchMarkerResults = false;
						$scope.showOrgSearch = true; // hide org search
						$scope.blockSaerchOrg = "";
						$scope.showSidepanel(false);
						$scope.searchVal = "";
					}

					$scope.loadOrgsInMap = function(orgsArray, searchVal) {
						var tempDataArray = new Array();
					$scope.activeMarkerList = orgsArray;
						// extracting the array and creating the community data.
						for (var i = 0; i < orgsArray.length; i++) {

							// code to add the buyer in the map
							if (orgsArray[i].role == "Buyer") {
								var tempOrgObj = new Object();
								tempOrgObj.partyRoleCode = orgsArray[i].role;

								var address = orgsArray[i].address;
								// convert addresss string to object
								var result = address.split(",");

								var tempAddressObj = new Object();
								tempAddressObj.countryCode = result[3];
								tempAddressObj.postalCodeNumber = result[0];
								tempAddressObj.addressLine1 = result[2];
								tempAddressObj.city = result[1];

								tempOrgObj.address = tempAddressObj;
								// currently its hard coded.
								tempOrgObj.identification = {
									"Patagoniaid" : "Patagonia"
								};
								tempOrgObj.info = {
									alerts : 'None',
									poCount : 5,
									"orderPropotion" : 20
								};
								// end of hard coded data
								tempOrgObj.name = orgsArray[i].name;
								tempOrgObj.memberId = orgsArray[i].orgId;
								tempOrgObj.contact = new Object();
								tempOrgObj.latitude = orgsArray[i].latitude;
								tempOrgObj.longitude = orgsArray[i].longitude;
								tempOrgObj.latLang = null;
								var cords = new Object();
								cords.show = 'false';
								cords.id = orgsArray[i].uid;
								var cor = new Object();
								cor.latitude = orgsArray[i].latitude;
								cor.longitude = orgsArray[i].longitude;
								cords.coords = cor;
								tempOrgObj.coords = cor;
								tempOrgObj.options = {
									//labelContent : orgsArray[i].name,
									//labelClass : 'labels'
								};
								// setting icon style
								tempOrgObj.icon = $scope.getMarkerCss(orgsArray[i].role);
								tempOrgObj.filterValue = $scope.setFilter(orgsArray[i].role);
								
								if(orgsArray[i].hasOwnProperty('auditCount')){
									tempOrgObj.auditCount=orgsArray[i].auditCount;
									// special icon for audit
								}
								
								// pushing the value in to temp array.
								if(orgsArray[i].hasOwnProperty('latitude') && orgsArray[i].hasOwnProperty('longitude'))
								tempDataArray.push(tempOrgObj);
							}

							if (orgsArray[i].hasOwnProperty("community")) {
								var communities = orgsArray[i].community;
								for (var k = 0; k < communities.length; k++) {

									var tempOrgObj = new Object();
									tempOrgObj.partyRoleCode = communities[k].role;

									var address = communities[k].address;
									// convert addresss string to object
									var result = address.split(",");

									var tempAddressObj = new Object();
									tempAddressObj.countryCode = result[3];
									tempAddressObj.postalCodeNumber = result[0];
									tempAddressObj.addressLine1 = result[2];
									tempAddressObj.city = result[1];

									tempOrgObj.address = tempAddressObj;
									// currently its hard coded.
									tempOrgObj.identification = {
										"Patagoniaid" : "Patagonia"
									};
									tempOrgObj.info = {
										alerts : 'None',
										poCount : 5,
										"orderPropotion" : 20
									};
									// end of hard coded data
									tempOrgObj.name = communities[k].sellerOrgname;
									tempOrgObj.memberId = communities[k].sellerOrgId;
									tempOrgObj.contact = new Object();
									tempOrgObj.latitude = communities[k].latitude;
									tempOrgObj.longitude = communities[k].longitude;
									tempOrgObj.latLang = null;
									tempOrgObj.uid = k;

									var cords = new Object();
									cords.show = 'false';
									cords.id = communities[k].uid;
									var cor = new Object();
									cor.latitude = communities[k].latitude;
									cor.longitude = communities[k].longitude;
									cords.coords = cor;
									tempOrgObj.coords = cor;
									tempOrgObj.options = {
										//labelContent : communities[k].sellerOrgname,
										//labelClass : 'labels'
									};
									// setting icon style
								var tempIcon = $scope.getMarkerCss(communities[k].role);;
									tempOrgObj.icon = tempIcon;
									tempOrgObj.filterValue = $scope.setFilter(communities[k].role);
									if(communities[k].hasOwnProperty('auditCount')){
										tempOrgObj.auditCount=communities[k].auditCount;
										// special audit
									tempIcon.fillOpacity = 0.9;
									tempIcon.strokeColor = '#42843f';
									tempIcon.strokeWeight = 3;
									}
									
									// pushing the value in to temp array.
									if(communities[k].hasOwnProperty('latitude') && communities[k].hasOwnProperty('longitude'))
									tempDataArray.push(tempOrgObj);

								}
							} else {
								$scope.showMessage("No community data for the org..");

								$timeout(function() {
									$scope.hideMessge();
								}, 3000);
							}

						}

						// assign data to community array.
						for (var index = 0; index < $scope.community.length; index++) {
							var org = $scope.community[index];

							if (org.marker) {
								org.marker.setMap(null);
							}
						}
						console.log($scope.community);
						//$scope.community = tempDataArray;
						$scope.comMarkers = tempDataArray;
						console.log($scope.community);
						// commented to stop the old map implementation.
						$ionicLoading.hide();
						/*
						 * $scope.refreshFilter(); //loading map $scope.mapClass = '';
						 * $scope.signinClass = 'login_click'; $scope.startValue = true; // some
						 * cool animation var switchUser = document.getElementById('switch-user');
						 * move(switchUser).delay('2s').ease('in').y('70').end(); // FIXME not
						 * working var resetMap = document.getElementById('reset-map');
						 * move(resetMap).delay('3s').ease('in').y('70').end();
						 */
						$scope.searchVal = searchVal;
						$scope.OrgClicked=true;
					};

					// set role
					/*
					 * $scope.filter = { buyer : true, seller : true, factory : true, other : false,
					 * order : false, country : false };
					 */

					$scope.setFilter = function(partyRoleCode) {
						var val = "";
					
						if (partyRoleCode === "Buyer") {
							if($scope.buyerRole){
								val = true;
							}else{
								val = false;
							}
						
						}else if (partyRoleCode === "Seller") {
							if($scope.sellerRole){
								val = true;
							}else{
								val = false;
							}
	
						}else if ((partyRoleCode === "ReceivedFrom" || partyRoleCode === "Factory")) {
							
							if($scope.factoryRole){
								val = true;
							}else{
								val = false;
							}

						}else if ((partyRoleCode !== "Buyer") && (partyRoleCode !== "Seller")
								&& (partyRoleCode !== "ReceivedFrom")) {
							if($scope.otherRole){
								val = true;
							}else{
								val = false;
							}

						}
						
						return val;
					};
					

					$scope.filterValueConst = {
						buyer : {
							value : 'Buyer',
							boolVal : true
						},
						seller : {
							value : 'Seller',
							boolVal : true
						},
						factory : {
							value : 'ReceivedFrom',
							boolVal : true
						},
						other : {
							value : 'other',
							boolVal : false
						},
						order : {
							value : 'order',
							boolVal : false
						},
						country : {
							value : 'country',
							boolVal : false
						}
					};
					// return marker css depend on the role
					$scope.getMarkerCss = function(partyRoleCode) {
					
						var symbolScale = 8;
						if (partyRoleCode === "Buyer") {
							symbolScale = 10
							customIcon = {
								path : google.maps.SymbolPath.CIRCLE,
								scale : symbolScale,
								fillOpacity : 0.7,
								fillColor : '#c13236',
								strokeOpacity : 0.9,
								strokeColor : '#c13236',
								strokeWeight : 2
							}
						}

						if (partyRoleCode === "Seller") {

							customIcon = {
								path : google.maps.SymbolPath.CIRCLE,
								scale : symbolScale,
								fillOpacity : 0.5,
								fillColor : '#dd7b00',
								strokeOpacity : 0.9,
								strokeColor : '#bc6900',
								strokeWeight : 2
							}
						}

						if (partyRoleCode === "ReceivedFrom" || partyRoleCode == "Factory") {

							customIcon = {
								path : google.maps.SymbolPath.CIRCLE,
								scale : symbolScale,
								fillOpacity : 0.5,
								fillColor : '#3d8a94',
								strokeOpacity : 0.8,
								strokeColor : '#3d8a94',
								strokeWeight : 2
							}
						}else if ((partyRoleCode !== "Buyer") && (partyRoleCode !== "Seller")
								&& (partyRoleCode !== "ReceivedFrom") && (partyRoleCode !== "Factory")) {

							customIcon = {
								path : google.maps.SymbolPath.CIRCLE,
								scale : symbolScale,
								fillOpacity : 0.5,
								fillColor : '#717171',
								strokeOpacity : 0.8,
								strokeColor : '#717171',
								strokeWeight : 2
							}
						}
						return customIcon;
					};

					// generated by project moonshot.appxpress
					var styles=[{featureType:"water",elementType:"all",stylers:[{color:"#1c334b"},{saturation:0}]},{featureType:"road",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"landscape.natural.landcover",elementType:"all",stylers:[{color:"#daddd6"},{saturation:0}]},{featureType:"landscape.natural.terrain",elementType:"all",stylers:[{color:"#daddd6"},{hue:"#aaff00"},{saturation:-22}]}];

					$scope.map = {
						center : {
							latitude : 0,
							longitude : 0
						},
						zoom : 2,
						styles : styles
					};
					$scope.options = {
						scrollwheel : true,
						maxWidth : '800'
					};

					/*
					 * $scope.marker = { coords : { latitude : 40.1451, longitude : -99.6680 }, show :
					 * false, id : 0 };
					 */
					$scope.marker = {
						options : {
							labelContent : "hello"
						}
					};

					$scope.$on('mapInitialized', function(event, map) {

					});

					uiGmapIsReady.promise(1).then(function(instances) {
						instances.forEach(function(inst) {
							var map = inst.map;
							var uuid = map.uiGmap_id;
							var mapInstanceNumber = inst.instance; // Starts at 1.
							// $scope.map = map;
							console.log("print map");
							console.log(map);
							 
										  // MAP options
										  map.setOptions({
														 styles : styles,
														 minZoom : 2,
														 maxZoom : 9,
														 mapTypeControl: false,
														 
														 panControl: false,
														 streetViewControl: false,
														 zoomControl: false,
														 zoomControlOptions: {
														 style: google.maps.ZoomControlStyle.LARGE,
														 position: google.maps.ControlPosition.RIGHT_TOP
														 }
														 
										 });
										  
										  // Create the DIV to hold the control and call the ZoomControl() constructor
										  // passing in this DIV.
										  var zoomControlDiv = document.createElement('div');
										  var zoomControl = new ZoomControl(zoomControlDiv, map);
										  
										  zoomControlDiv.index = 1;
										  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(zoomControlDiv);
										  

										  
										  

						});
					});
					/*
					$scope.buyerRole = true;
					$scope.sellerRole = true;
					$scope.factoryRole = true;
					$scope.otherRole = false;
					$scope.orderRole = false;
					$scope.countryRole = false;
					*/
					

					$scope.filterChanged = function(partyRoleCode,bool) {
						
						console.log("seller changed.");
					$scope.showSidepanel(false);

						//console.log(partyRoleCode);
						var tempArray = new Array();
						tempArray =$scope.comMarkers;
				
						for(var i=0;i<tempArray.length;i++) {
							
							if(tempArray[i].partyRoleCode == partyRoleCode){
								if(bool){
									tempArray[i].filterValue=true;
									
								}else{
									tempArray[i].filterValue=false;
								}
							}else if(partyRoleCode === "ReceivedFrom" && tempArray[i].partyRoleCode == "Factory"){
								
								if(bool){
									tempArray[i].filterValue=true;
									
								}else{
									tempArray[i].filterValue=false;
								}
							}else if((tempArray[i].partyRoleCode !== "Buyer") && (tempArray[i].partyRoleCode !== "Seller")
									&& (tempArray[i].partyRoleCode !== "ReceivedFrom") && (tempArray[i].partyRoleCode !== "Factory") && partyRoleCode == "other"){
								if(bool){
									tempArray[i].filterValue=true;
									
								}else{
									tempArray[i].filterValue=false;
								}
							}
					// order proportions
					//console.log($scope.orderRole + bool);
					//&& $scope.orderRole
					// FIXME
					// NEED TO ADD whether order propotion is checked
					var originalIcon = tempArray[i].icon;
					if(partyRoleCode == "order" && (tempArray[i].partyRoleCode =="Seller" || tempArray[i].partyRoleCode == "Factory") && bool) {
						var rndmOrder = Math.floor(Math.random() * 20) + 1;
					
					if(rndmOrder >= 8) {
						originalIcon.scale = rndmOrder;
					}
					originalIcon.strokeWeight = 1;
					tempArray[i].icon = originalIcon;
					
					} else {
					originalIcon.strokeWeight = 2;
					originalIcon.scale = 8;
					tempArray[i].icon = originalIcon;
					}
					
					// Need to set to default marker if unchecked.
					
					//originalIcon.scale = 8;
					//originalIcon.strokeWeight = 2;
					//tempArray[i].icon = originalIcon;
					}
					
					
						if (partyRoleCode === "Buyer") {
							if(bool){
								$scope.buyerRole = true;
								
							}else{
								$scope.buyerRole = false;
							}
						}

						if (partyRoleCode === "Seller") {
							if(bool){
								$scope.sellerRole = true;
								
							}else{
								$scope.sellerRole = false;
							}
						}

						if ((partyRoleCode === "ReceivedFrom" || partyRoleCode === "Factory")) {
							if(bool){
								$scope.factoryRole = true;
								
							}else{
								$scope.factoryRole = false;
							}

						}else if ((partyRoleCode !== "Buyer") && (partyRoleCode !== "Seller")
								&& (partyRoleCode !== "ReceivedFrom")) {
							if(bool){
								$scope.otherRole = true;
								
							}else{
								$scope.otherRole = false;
							}
						}
						
					
					// order proportions
						
						$scope.comMarkers=tempArray;
					};

					$scope.getVisible = function(partyRoleCode) {
						
						if (partyRoleCode === "Buyer" && $scope.buyerRole) {
							return true;

						}

						if (partyRoleCode === "Seller" && $scope.sellerRole) {
							return true;
						}

						if (partyRoleCode === "ReceivedFrom" && $scope.factoryRole) {
							return true;

						}

						if ((partyRoleCode !== "Buyer") && (partyRoleCode !== "Seller")
								&& (partyRoleCode !== "ReceivedFrom") && $scope.otherRole) {
							return true;
						}
					}
					
					$scope.temp="";
					$scope.weatherdescription="";
					$scope.minTemp="";
					$scope.maxTemp="";
					$scope.humid="";
					$scope.pressure="";
 
					$scope.markerClicker = function(uid,org, hasAutoCenter) {
						console.log("ZOOM VALUE " + JSON.stringify($scope.map));
						$scope.cEvnts(event);
					//var minButton = document.getElementById('minimize');
					//move(minButton).delay('0.3s').ease('in').x('-80').end();

						// corrected latitude
					//var lat = Number($scope.comMarkers[uid].latitude) - STATIC_MAP_CENTER_LAT_OFFSET;


					// store last selected marker for animation
						$scope.lastPointerMarker =
							 {
								latitude : $scope.comMarkers[uid].latitude,
								longitude : $scope.comMarkers[uid].longitude
							};


					// auto center this location
					if(hasAutoCenter) {
						$scope.map = {
						center : {
						latitude : $scope.comMarkers[uid].latitude,
						longitude : $scope.comMarkers[uid].longitude
						}
						}
 
					}
					
					/*var staticMarker=$scope.comMarkers[uid].icon;$scope.comMarkers[uid].icon=customIcon={path:google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,scale:10,fillOpacity:.7,fillColor:"#ff9436",strokeOpacity:.9,strokeColor:"#ff5612",strokeWeight:1};
					
					 $scope.comMarkers[uid].options = {
					 labelContent : $scope.comMarkers[uid].sellerOrgname,
					 labelClass : 'labels'
					 };
					
					//$scope.comMarkers[uid].setAnimation(google.maps.Animation.BOUNCE);
					 $timeout(function() {
							 $scope.comMarkers[uid].icon = staticMarker;
							 $scope.map.options =  null;
								}, 10000);
					*/
					
					
					org.info = { // TODO : Remove this hard coded data at the time of
							// integration
							lastOrder : '2015-08-13',
							nextOrder : '2015-09-01',
							riskStatus : 'N/A',
							auditStatus : 'N/A',
							completedOrderVolume : 2430,
							pendingOrderVolume : 36,
							totalFinancing : 'US$ 2,500,000.00',
							completedSupportCases : 17,
							pendingSupportCases : 0,
							chartData : [ // TODO : Random numbers between 10-110 are assigned for
							// values for the static demo
							{
								value : Math.floor((Math.random() * 100) + 10),
								color : '#F7464A',
								highlight : '#FF5A5E',
								label : 'Orders'
							}, {
								value : Math.floor((Math.random() * 100) + 10),
								color : '#46BFBD',
								highlight : '#5AD3D1',
								label : 'Invoices'
							}, {
								value : Math.floor((Math.random() * 100) + 10),
								color : "#4D5360",
								highlight : "#616774",
								label : 'Payments'
							}, {
								value : Math.floor((Math.random() * 100) + 10),
								color : '#FDB45C',
								highlight : '#FFC870',
								label : 'Pack Plans'
							}, {
								value : Math.floor((Math.random() * 100) + 10),
								color : '#D4CCC5',
								highlight : '#E2EAE9',
								label : 'Other'
							} ]
						}; // TODO : Remove this at the time of integration
						
						
						//loading weatherData
						//console.log(org);
						
						WeatherService.getWeatherInfo($http,org.latitude,org.longitude).success(function(data, status, headers, config) {
							console.log(data.main);
							console.log(data);
							$scope.temp=$scope.convertToC(data.main.temp);
							$scope.icon=cockpit_config.open_weather_icon+data.weather[0].icon+".png";
							var capitalizedDescription =  data.weather[0].description;;
							try {
								capitalizedDescription = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
							} catch(e) {

							}
							$scope.weatherdescription = capitalizedDescription;
							$scope.minTemp=$scope.convertToC(data.main.temp_max);
							$scope.maxTemp=$scope.convertToC(data.main.temp_min);
							$scope.humid=data.main.humidity;
							$scope.pressure=data.main.pressure;
						}).error(function(data, status, headers, config) {
							$scope.showMessage("Unable to reach weather service. ["+status+"]");
								 console.log(" error in weather service " + status + " " + data);
								 $scope.temp='-';
								 $scope.icon='';
								 $scope.weatherdescription='';
								 $scope.minTemp='-'
								 $scope.maxTemp='-'
								 $scope.humid='-'
								 $scope.pressure='-';
						});
						
						//service call to get audit count
						var authToken = localStorage.getItem(cockpit_config.local_storage_auth_token_key);
						console.log(org);
						var orgName=(org.name).trim();
						/*$scope.auditCount="Loading ...";
						QcUserService.getAuditCount(authToken,orgName).success(function(data, status, headers, config) {
							
							console.log(data);
							if(data.resultInfo.count>0 && (data.result[0]).hasOwnProperty('auditCount')){
								$scope.auditCount=data.result[0].auditCount;
							}else{
								$scope.auditCount="No Audit Data for "+orgName;
							}
							
						}).error(function(data, status, headers, config) {
							$scope.showMessage("Failed to fetch data for Qc .");

							$timeout(function() {
								$scope.hideMessge()
							}, 3000);
						});
						*/
						if(org.hasOwnProperty("auditCount")){
							$scope.auditCount="<b>"+org.auditCount+"</b> audit reports found.";
						}else{
							$scope.auditCount="<em>No audit records were found</em>";
						}
						$scope.clickedOrg = org;
						$scope.showSidepanel(true);

						getTimeZone(org.latitude, org.longitude);
					
					}
					
 					$scope.convertToC=function (val) {
				        var fTempVal = val;
				
				        var cTempVal = 5/9 * (fTempVal - 32)  ;
				        
				        return parseInt(val-273.15);
				    }
 					var hideSearch = function() {
					console.log("MAP CLICKED");
						$scope.searchResults = false;
					}

					
					$scope.resetMap = function() {
					$scope.map.setZoom(3);
					$scope.map.setCenter(new google.maps.LatLng(20, 0));
					}


                    $scope.focusOutTextBox = function (type) {


                        $timeout(function () {
                            console.log("lost focus");
                            $scope.searchResults = false; // hide org search results
                            $scope.searchMarkerResults = false; // hide marker results
                            $scope.searchItelliReusults = false;
                        }, 1000);

                    }

 					
					// screw maps
					$scope.cEvnts = function(event) {
					console.log("EVENT DRAGSTART");
						//if(!$ionicSideMenuDelegate.isOpen()) {
						//var minButton = document.getElementById('minimize');
						//move(minButton).delay('0.3s').ease('in').x('50').end();
						//}
					//$scope.map.icon = $scope.LAST_TOUCHED_MARKER
					$scope.hideAccount(true);
					$scope.searchResults=false;
					$scope.searchMarkerResults = false;
					$scope.showSidepanel(false);
						event.preventDefault(event);

					}
					

					try {

						var mapObj = document.getElementById('map_canvas');
						google.maps.event.addDomListener(window, 'dragstart', $scope.cEvnts(event));

						google.maps.event.addDomListener(mapObj, 'dblclick', cEvnts);
					} catch(e) {
						console.log("Error in event listners " + e.toString());
					}
					// custom zoom baby
					
					function ZoomControl(controlDiv, map) {
					
					// Creating divs & styles for custom zoom control
					controlDiv.style.padding = '5px';
					
					// Set CSS for the control wrapper
					var controlWrapper = document.createElement('div');
					controlWrapper.style.backgroundColor = 'none';
					controlWrapper.style.borderStyle = 'solid';
					controlWrapper.style.borderRadius = '10%';
					controlWrapper.style.marginTop = '5px';
					controlWrapper.style.marginRight = '8px';
					controlWrapper.style.cursor = 'pointer';
					controlWrapper.style.textAlign = 'center';
					controlWrapper.style.width = '32px';
					controlWrapper.style.height = '64px';
					controlDiv.appendChild(controlWrapper);
					
					// Set CSS for the zoomIn
					var zoomInButton = document.createElement('div');
					zoomInButton.style.width = '32px';
					zoomInButton.style.height = '32px';
					zoomInButton.style.backgroundColor = '#1c334b';
					zoomInButton.style.borderRadius = '20% 20% 0 0';
					zoomInButton.style.borderStyle = 'solid';
					zoomInButton.style.borderColor = '#fff';
					zoomInButton.style.borderWidth = '1px';
					zoomInButton.innerHTML = '+';
					zoomInButton.style.color = '#fff';
					zoomInButton.style.fontSize = '20px';
					zoomInButton.style.paddingTop = '5px';
					/* Change this to be the .png image you want to use */
					controlWrapper.appendChild(zoomInButton);
					
					// reset
					// Set CSS for reset mappy
					var zoomResetButton = document.createElement('div');
					zoomResetButton.style.width = '32px';
					zoomResetButton.style.height = '32px';
					zoomResetButton.style.backgroundColor = '#1c334b';
					zoomResetButton.style.marginTop = '2px';
					zoomResetButton.style.borderStyle = 'solid';
					zoomResetButton.style.borderColor = '#fff';
					zoomResetButton.style.borderWidth = '1px';
					zoomResetButton.innerHTML = 'o';
					zoomResetButton.style.color = '#fff';
					zoomResetButton.style.fontSize = '20px';
					zoomResetButton.style.paddingTop = '5px';
					/* Change this to be the .png image you want to use */
					controlWrapper.appendChild(zoomResetButton);
					
					// Set CSS for the zoomOut
					var zoomOutButton = document.createElement('div');
					zoomOutButton.style.backgroundColor = '#1c334b';
					zoomOutButton.style.borderRadius = '0 0 20% 20%';
					zoomOutButton.style.marginTop = '2px';
					zoomOutButton.style.borderStyle = 'solid';
					zoomOutButton.style.borderColor = '#fff';
					zoomOutButton.style.borderWidth = '1px';
					zoomOutButton.style.width = '32px';
					zoomOutButton.style.height = '32px';
					zoomOutButton.style.paddingTop = '5px';
					zoomOutButton.innerHTML = '-';
					zoomOutButton.style.fontSize = '20px';
					zoomOutButton.style.color = '#fff';
					/* Change this to be the .png image you want to use */
		
					controlWrapper.appendChild(zoomOutButton);
					
					// Setup the click event listener - zoomIn
					google.maps.event.addDomListener(zoomInButton, 'click', function() {
													 map.setZoom(map.getZoom() + 1);
													 });
					
					// Setup the click event listener - zoomOut
					google.maps.event.addDomListener(zoomOutButton, 'click', function() {
													 map.setZoom(map.getZoom() - 1);
													 });


						// Setup the click event listener - zoomRest
						google.maps.event.addDomListener(zoomResetButton, 'click', function () {

							map.setZoom(1);
							$timeout(function () {
								$scope.map = {
									center: {
										latitude: 0,
										longitude: 0
									}
								}
							}, 1000);

						});
					}
					
					$scope.signOut = function () {
					
					
					var confirmPopup = $ionicPopup.confirm({
														   title: '',
														   template: 'Are you sure you want to sign out ?',
														   okText: 'Yes',
														   cancelText: 'No',
														   okType: 'button-dark', 
														   });
					confirmPopup.then(function(res) {
									  if(res) {
									  console.log("signOut");
									  $scope.startInput = true; // set value hide menu
									  $scope.showSearch();
									  //$scope.map.setZoom(2);
									  localStorage.setItem(cockpit_config.local_storage_auth_token_key, null);
									  localStorage.setItem("password", null);
									  $scope.mapClass = 'map_canvas';
									  $scope.signinClass = '';
									  $scope.startValue = false;
									  $scope.comMarkers = [];
									  var switchUser = document.getElementById('switch-user');
									  move(switchUser).delay('0.5s').ease('in').y('-70').end();
									  $scope.searchResults = false;
									  $scope.showFactorySearch = false; // show factory search
									  $scope.showOrgSearch = true; // hide org search
									  $scope.blockSaerchOrg= "";
									  $scope.hideDetailSection();
									  $scope.searchVal = "";
									  $scope.map = {
									  center : {
									  latitude : 0,
									  longitude : 0
									  },
									  zoom : 1,
									  styles : styles
									  };
									  
									  $scope.hideMessge();
									  } else {
									  
									  }
									  });
					
					
					}
					
					$scope.toggleFilter = function () {
					
					$scope.searchItelliReusults = false;
					$scope.searchMarkerResults = false;
					// DONOT USE THIS. NOT GOING TO WORK
					// $scope.comMarkers = [];

						if($scope.currentToggle == 1) {
							//$scope.searchItelliReusults = false;
							//$scope.showFactorySearch = true;
							$scope.toggleDisplay = "ion-arrow-right-b";
							$scope.currentToggle = 2;
							$scope.placeholderMarker = "Search for a marker";
							$scope.searchItelliReusults = false;
							//$scope.showFactorySearch = false;
					
					} else if($scope.currentToggle == 2) {
					// has audits
						$scope.toggleDisplay = "ion-pound";
						$scope.currentToggle = 1;
						$scope.placeholderMarker = "Filter results by";
						$scope.searchItelliReusults = false;
                        $scope.searchFactory = '';
						//$scope.showFactorySearch = false;
                        //document.getElementById("textFactory").focus();
                        //menuDisplayConfig(false, false, true, false);

					
 					} else {
					//
						$scope.toggleDisplay = "ion-arrow-right-b";
						$scope.currentToggle = 1;
					}
					}
					
					$scope.naturalLanguageFilter = function(searchFilter, filterId) {
                        console.log("naturalLanguageFilter");
						$scope.showMessage("We are still working on this");
						$scope.searchFactory = searchFilter;
					if(filterId === 0) {
					
					}

					}
					
					$scope.showCockpitToolTip = function(thisTop, thisLeft, text, duration) {
						$scope.tooltip.top =  thisTop+'px';
						$scope.tooltip.left = thisLeft+'px';
						$scope.tooltip.message = text;
					}
					
					$scope.setCenter = function (lat, lng) {
					return { latitude: lat, longitude: lng };
					}
					
					$scope.hideGotIt = function () {
						$scope.showTooltip = false;
					}
					
					// SHOW MESSASGE
					$scope.showSidepanel = function(isShow) {
					if(isShow) {
					var msg = document.getElementById('sidePlanelDefault');
					move(msg).delay('0.2s').ease('in').x('-275').end();
					} else {
					var msg = document.getElementById('sidePlanelDefault');
					move(msg).delay('0.3s').ease('in').x('275').end();
					$scope.displayError = "";
					}
					}
					
					
					//get timezone
					// alignment is screwed
					var getTimeZone = function (latitude, longitude) {
						var d = Math.floor(new Date().getTime() / 1000);
						$http.get('https://maps.googleapis.com/maps/api/timezone/json?location=' + latitude + ',' + longitude + '&timestamp=' + d).success(
							function (response) {
								console.log(JSON.stringify(response));
								if (response.status == 'OK') {
									$scope.timezone = response;
									d = d + response.rawOffset + response.dstOffset + new Date().getTimezoneOffset() * 60;
									var date = new Date(d*1000);
									var dnText = (date.getHours() >= 12) ? 'PM' : 'AM';
									$scope.currentTime = date.getHours() + ":"+date.getMinutes() + " " + dnText;


								}
							}).error(function (error) {
								console.log("MAP " + error.message);
								$scope.currentTime = "Unable to show timezone";
								$scope.timezone = "";
							});


					}
					
			 // display combine loader

					var menuDisplayConfig = function(isSearchResults, isMarkerResults, isSearchIntelliResults, isFilterMenu) {


						if(isSearchResults) {}
							$scope.searchResults = isSearchResults;
						if(isMarkerResults){}
						$scope.searchMarkerResults = isMarkerResults;
						if(isSearchIntelliResults){}
							$scope.searchItelliReusults = isSearchIntelliResults;
						if(isFilterMenu){
                            // THIS IS NOT GOOD ENOUGH
							//$scope.filterMenu = isFilterMenu;
						}
					}

					$scope.zoomToMarker = function (zoomInThreshhold) {
						// get center
						$scope.map.center = $scope.lastPointerMarker;

						// zoom in like sliding
						$timeout(function () {
							console.log("ZOOM VALUE " + JSON.stringify($scope.map));

							var zoomMapIn = $scope.map.zoom;
							//console.log("ZOOM VALUE " + zoomMapIn);
							$interval(function () {
								if (zoomMapIn < zoomInThreshhold) {
									$scope.map.zoom = zoomMapIn;
									zoomMapIn++;
								}
							}, 100, zoomInThreshhold);
						}, 200);

					}

					// move to selected marker
					$scope.zoomOutOfMarker = function(ZoomOutThreshhold) {
						// zoom in like sliding
						//$timeout(function () {
							var zoomMapOut = $scope.map.zoom;
							//console.log("ZOOM VALUE " + zoomMapIn);
							$interval(function () {
								if (zoomMapOut > ZoomOutThreshhold ) {
									$scope.map.zoom = zoomMapOut;
									console.log(">> "+zoomMapOut);
									zoomMapOut--;
								}
							}, 100, 10);
						//}, 100);
					}
					
				});
