'use strict';

angular.module('todoPostApp')
  .directive('tdpCanvas', function() {
    return {
      replace: true,
      transclude: true,
      templateUrl: 'app/components/canvas/canvas.html',

      controller: function canvasCtrl($scope) {

        // initialize
        var top = document.getElementById('canvas').getClientRects()[0].top,
            moveInit = { draggable: false};

        $scope.moveState = moveInit;

        $scope.addPost = function(e) {
          //add post when clicking on canvas area only
          //make sure nothings dragging
          if (e.target.id === "canvas") {
            $scope.posts.push({
              title: '',
              description: '',
              subtasks: [],
              color: 'yellow',
              position: {
                top: e.clientY - top,
                left: e.clientX,
                'z-index': $scope.posts.length
              }
            });
          }
        };

        $scope.removePost = function(key) {
          if (confirm("Are you sure? Deletes are permanent!")) {
            $scope.posts.splice(key, 1);
          }
        };
      } /* End Controller */
    };
  });
