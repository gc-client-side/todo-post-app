'use strict';

angular.module('todoPostApp')
  .directive('tdpCanvas', function() {

    function CanvasCtrl($scope) {
      // initialize
      //var top = document.getElementById('canvas').getClientRects()[0].top;

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
          var promise = $scope.posts.$add({
            title: '',
            description: '',
            color: colors[Math.floor(Math.random()*colors.length)],
            position: {
              top: e.pageY,
              left: e.pageX,
              'z-index': $scope.posts.length
            }
          });
          promise.then(function(ref) {
            ref.update({
              taskId: ref.key()
            });
          });
        }
      };

      $scope.removePost = function(key) {
        if (confirm("Are you sure? Deletes are permanent!")) {
          $scope.posts.$remove(key).then(function(ref) {
            var taskList = $scope.taskList;
            taskList.$remove(taskList.$indexFor(ref.key())).then(function() {
             console.log('removed');
           });
          });
        }
      };
    }

    return {
      replace: true,
      transclude: true,
      template: '<main id="canvas" ng-click="enableDrag()" ng-dblclick="addPost($event)"></main>',
      controller: CanvasCtrl
    };
  });
