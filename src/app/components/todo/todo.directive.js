'use strict';

angular.module('todoPostApp')
  .directive('tdpPost', tdpPost);

function tdpPost() {
  return {
    scope: {
      posts: '=',
      post: '=',
      key: '=',
      taskList: '=',
      onRemove: '&'
    },
    replace: true,
    templateUrl: 'app/components/todo/todo.html',
    controller: TodoPostCtrl,
    controllerAs: 'td',
    bindToController: true
  };
}

TodoPostCtrl.$inject = ['postService'];

function TodoPostCtrl(postService) {

  var vm = this;


  /**
   * logic astract to service
   */
  vm.colors = postService.postColors;
  vm.checkPost = postService.checkPost;
  vm.savePost = postService.savePost;
  vm.updatePos = updatePos;
  vm.updateIndices = updateIndices;


  function updatePos(left, top) {
    postService.updatePosition(vm.key, left, top);
  }

  function updateIndices(oldIndex, topIndex) {
    postService.updateIndices(vm.key, oldIndex, topIndex);
  }

}
