'use strict';

angular.module('todoPostApp')
  .directive('todocanvas', function() {
    return {
      replace: true,
      transclude: true,
      template: '<main id="canvas"><input style="margin:100px" ng-model="query"/><div ng-transclude></div></main>'
      //templateUrl: 'app/components/canvas/canvas.html'
    };
  });
