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

CanvasCtrl.$inject = ['postService'];

function CanvasCtrl(postService) {

  var vm = this;
  vm.posts = postService.posts;
  vm.taskList = postService.taskList;
  vm.draggable = true;

  //vm.enableDrag = enableDrag;
  vm.addPost = postService.addPost;
  vm.removePost = postService.removePost;
  //$scope.$on('dragStatus', disableDrag);

  function enableDrag(e) {
    if (e.target.id === "canvas")
      vm.draggable = true;
  }

  function disableDrag(e, status) {
    vm.draggable = status;
  }
} /* end controller */
