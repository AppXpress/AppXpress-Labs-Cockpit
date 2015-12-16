angular.module('cockpit', ['ionic', 'cockpit.controllers','cockpit.services', 'cockpit.directives', 'tc.chartjs','uiGmapgoogle-maps'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

