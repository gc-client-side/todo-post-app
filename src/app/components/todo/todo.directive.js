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

TodoPostCtrl.$inject = ['$timeout'];

function TodoPostCtrl($timeout) {
  var vm = this,
      key = vm.key,
      postPromise;

  vm.colors = ['brown', 'orange', 'blue', 'light-blue',
    'green', 'purple', 'yellow'];
  vm.checkPost = checkPost;
  vm.savePost = savePost;
  vm.updatePos = updatePos;
  vm.updateIndices = updateIndices;

  function checkPost() {
    vm.posts[key].checked = !vm.post.checked ;
    vm.posts.$save(key);
  }

  function savePost() {
    if (postPromise)
      $timeout.cancel(postPromise);
    postPromise = $timeout(save, 500);

    function save() {
      vm.posts.$save(key);
    }
  }

  function updatePos(left, top) {
    vm.post.position.left = left;
    vm.post.position.top = top;
    vm.posts.$save(key);
  }

  function updateIndices(oldIndex, topIndex) {
    /**
     * new implementation where index decrease by 1 only if greater than the one being moved
     *
     * problem solved:
     *  moving same post multiple times changes others' indices
     *  clicking between 2 posts changes others' indices
     *  now removing a post also re-index
     */
    vm.post.position['z-index'] = topIndex;
    vm.posts.$save(key);
    angular.forEach(vm.posts, function(post, id) {
      // not to set z-index again for the clicked post
      if (id !== key && post.position['z-index'] > oldIndex) {
        post.position['z-index'] -= 1;
        vm.posts.$save(id);
      }
    })
  }

}
