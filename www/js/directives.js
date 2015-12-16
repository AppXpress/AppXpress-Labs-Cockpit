angular.module('cockpit.directives', [])

.directive('map', function() { // Map Directive
  return {
    restrict: 'E',
    scope: {
      onCreate: '&'
    },
    link: function ($scope, $element, $attr) {
      function initialize() {
        var mapOptions = {
          center: new google.maps.LatLng(20, 0), // New York = (40.7127, -74.0059)
          zoom: 3,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
		   mapTypeControl: false,
		   
		   panControl: false,
		   streetViewControl: false,
		   zoomControl: false,
		   zoomControlOptions: {
		   style: google.maps.ZoomControlStyle.LARGE,
		   position: google.maps.ControlPosition.LEFT_CENTER
		   
		   }
        };
        var map = new google.maps.Map($element[0], mapOptions);
  
        $scope.onCreate({map: map});

        // Stop the side bar from dragging when mousedown/tapdown on the map
        google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
          e.preventDefault();
          return false;
        });
      }

      if (document.readyState === "complete") {
        initialize();
      } else {
        google.maps.event.addDomListener(window, 'load', initialize);
      }
    }
  }
})
.directive('ngEnter', function () { // Enter Key Press
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) { // Enter Key Code = 13
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});

