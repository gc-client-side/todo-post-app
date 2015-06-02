'use strict';

angular.module('todoPostApp')
  .directive('tdpCanvas', tdpCanvas);

function tdpCanvas() {
  return {
    replace: true,
    transclude: true,
    template: '<main id="canvas" ng-click="enableDrag($event)" ng-dblclick="canvas.addPost($event)"></main>',
    controller: CanvasCtrl,
    controllerAs: 'canvas'
  };
}

CanvasCtrl.$inject = ['$firebaseArray', 'FBURL'];

function CanvasCtrl($firebaseArray, FBURL) {
  var ref = new Firebase(FBURL),
      postRef = ref.child('posts'),
      tasklistRef = ref.child('tasklist'),
      colors = ['brown', 'orange', 'blue', 'light-blue',
                'green', 'purple', 'yellow'];

  var vm = this;
  vm.posts = $firebaseArray(postRef);
  vm.taskList = $firebaseArray(tasklistRef);
  vm.draggable = true;

  //vm.enableDrag = enableDrag;
  vm.addPost = addPost;
  vm.removePost = removePost;
  //$scope.$on('dragStatus', disableDrag);

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
      var promise = vm.posts.$add({
        title: '',
        description: '',
        color: colors[Math.floor(Math.random()*colors.length)],
        checked: false,
        position: {
          top: e.pageY,
          left: e.pageX,
          'z-index': vm.posts.length+1
        }
      });
      promise.then(function(ref) {
        ref.update({
          taskId: ref.key()
        });
      });
    }
  }

  function removePost(key, taskId) {
    if (confirm("Are you sure? Deletes are permanent!")) {
      vm.posts.$remove(key).then(function(ref) {
        vm.taskList.$remove(vm.taskList.$indexFor(taskId));
        // remove related subtasks
        // resync posts
        vm.posts = $firebaseArray(ref.parent());
      });
    }
  }
} /* end controller */
