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

        /* move post functions */
        $scope.movePost = {

          // ng-mousedown
          startMove: function(key, e) {
            var posts = $scope.posts,
                pos = posts[key].position;

            pos['z-index'] = posts.length;

            $scope.moveState = {
              draggable: true,
              startX: pos.left,
              startY: pos.top,
              clientX: e.clientX,
              clientY: e.clientY,
              key: key
            };

            angular.forEach(posts, function(post, i) {
              if (i != key && post.position['z-index'])
                post.position['z-index'] -= 1;
            });
          },

          // ng-mousemove
          duringMove: function(e) {
            e.preventDefault();

            if ($scope.moveState.draggable) {
              var moveState = $scope.moveState,
                post = $scope.posts[moveState.key];

              post.position.top = moveState.startY + (e.clientY - moveState.clientY);
              post.position.left = moveState.startX + (e.clientX - moveState.clientX);
            }
          },

          // ng-mouseup
          endMove: function() {
            $scope.moveState = moveInit;
          }
        };

      } /* End Controller */
    };
  });
