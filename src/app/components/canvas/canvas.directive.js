'use strict';

angular.module('todoPostApp')
  .directive('tdpCanvas', function() {

    function canvasCtrl($scope) {
      // initialize
      var top = document.getElementById('canvas').getClientRects()[0].top;

      //post colors
      var colors = $scope.colors = ['brown', 'orange', 'blue', 'light-blue',
        'green', 'purple', 'yellow'
      ];

      $scope.draggable = true;

      $scope.enableDrag = function(e) {
        $scope.draggable = true;
      };

      $scope.addPost = function(e) {
        //add post when clicking on canvas area only
        if (e.target.id === "canvas") {
          $scope.posts.$add({
            title: '',
            description: '',
            subtasks: [],
            color: colors[Math.floor(Math.random()*colors.length)],
            position: {
              top: e.pageY,
              left: e.pageX,
              'z-index': $scope.posts.length
            }
          });
        }
      };

      $scope.removePost = function(key) {
        if (confirm("Are you sure? Deletes are permanent!")) {
          $scope.posts.$remove(key);
        }
      };
    }

    return {
      replace: true,
      transclude: true,
      template: '<main id="canvas" ng-click="enableDrag()" ng-dblclick="addPost($event)"></main>',
      controller: canvasCtrl
    };
  });
