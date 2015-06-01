'use strict';

angular.module('todoPostApp')
  .directive('tdpCanvas', tdpCanvas);

function tdpCanvas() {
  return {
    replace: true,
    transclude: true,
    template: '<main id="canvas" ng-click="enableDrag($event)" ng-dblclick="addPost($event)"></main>',
    controller: CanvasCtrl,
    controllerAs: 'canvas'
  };
}

CanvasCtrl.$inject = ['$scope', '$firebaseArray', 'FBURL'];

function CanvasCtrl($scope, $firebaseArray, FBURL) {
  var ref = new Firebase(FBURL),
      postRef = ref.child('posts'),
      tasklistRef = ref.child('tasklist'),
      colors = ['brown', 'orange', 'blue', 'light-blue',
                'green', 'purple', 'yellow'];

  var vm = this;

  vm.colors = colors;
  vm.posts = $firebaseArray(postRef);
  vm.taskList = $firebaseArray(tasklistRef);
  vm.draggable = true;

  vm.enableDrag = enableDrag;
  vm.addPost = addPost;
  vm.removePost = removePost;
  $scope.$on('dragStatus', disableDrag);

  function enableDrag(e) {
    if (e.target.id === "canvas")
      vm.draggable = true;
  }

  function disableDrag(e, status) {
    vm.draggable = status;
  }

  function addPost(e) {
    //add post when clicking on canvas area only
    if (e.target.id === "canvas") {
      var promise = main.posts.$add({
        title: '',
        description: '',
        color: colors[Math.floor(Math.random()*colors.length)],
        checked: false,
        position: {
          top: e.pageY,
          left: e.pageX,
          'z-index': main.posts.length+1
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
      main.posts.$remove(key).then(function(ref) {
        // remove related subtasks
        var taskList = main.taskList;
        taskList.$remove(taskList.$indexFor(ref.key()));
        // resync posts
        main.posts = $firebaseArray(ref.parent());
      });
    }
  }
} /* end controller */
