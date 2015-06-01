'use strict';

angular.module('todoPostApp')
  .directive('tdpCanvas', tdpCanvas);

function tdpCanvas() {
  return {
    replace: true,
    transclude: true,
    template: '<main id="canvas" ng-click="enableDrag()" ng-dblclick="addPost($event)"></main>',
    controller: CanvasCtrl
  };
}

function CanvasCtrl($scope, $firebaseArray) {
  // initialize
  //var top = document.getElementById('canvas').getClientRects()[0].top;

  //post colors
  var colors = $scope.colors = ['brown', 'orange', 'blue', 'light-blue',
    'green', 'purple', 'yellow'
  ];

  $scope.draggable = true;
  $scope.enableDrag = enableDrag;
  $scope.addPost = addPost;
  $scope.removePost = removePost;

  function enableDrag() {
    $scope.draggable = true;
  }

  function addPost(e) {
    //add post when clicking on canvas area only
    if (e.target.id === "canvas") {
      var promise = $scope.posts.$add({
        title: '',
        description: '',
        color: colors[Math.floor(Math.random()*colors.length)],
        checked: false,
        position: {
          top: e.pageY,
          left: e.pageX,
          'z-index': $scope.posts.length+1
        }
      });
      promise.then(function(ref) {
        ref.update({
          taskId: ref.key()
        });
      });
    }
  }

  function removePost(key) {
    if (confirm("Are you sure? Deletes are permanent!")) {
      $scope.posts.$remove(key).then(function(ref) {
        // remove related subtasks
        var taskList = $scope.taskList;
        taskList.$remove(taskList.$indexFor(ref.key()));
        // resync posts
        $scope.posts = $firebaseArray(ref.parent());
      });
    }
  }
} /* end controller */
