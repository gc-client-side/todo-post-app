'use strict';

angular.module('todoPostApp')
  .directive('tdpPost', tdpPost);

function tdpPost() {
  return {
    scope: {
      posts: '=',
      post: '=',
      key: '='
    },
    replace: true,
    templateUrl: 'app/components/todo/todo.html',
    controller: TodoPostCtrl,
    controllerAs: 'td',
    bindToController: true,
    link: link
  };

  function link(scope, element, attrs, todo) {
    var id = scope.key;

    //watch for individual post (position) updates
    scope.$watch('post.position', function() {
      scope.$emit('update', id);
    }, true);
  }
}

TodoPostCtrl.$inject = ['$scope', '$timeout'];

function TodoPostCtrl($scope, $timeout) {
  var vm = this;
  var postPromise = null;

  vm.checkPost = checkPost;
  vm.savePost = savePost;
  vm.updatePos = updatePos;
  vm.updateIndices = updateIndices;


  function checkPost(key) {
    vm.posts[key].checked = !post.checked ;
    main.posts.$save(key);
  }

  function savePost(key) {
    if (postPromise)
      $timeout.cancel(postPromise);
    postPromise = $timeout(save, 500);

    function save() {
      main.posts.$save(key);
    }
  }

  function updatePos(left, top) {
    post.position.left = left;
    post.position.top = top;
  }

  function updateIndices(oldIndex) {
    /**
     * new implementation where index decrease by 1 only if greater than the one being moved
     *
     * problem solved:
     *  moving same post multiple times changes others' indices
     *  clicking between 2 posts changes others' indices
     *  now removing a post also re-index
     */
    var id = post.$id;
    angular.forEach(main.posts, function(post) {
      // not to set z-index again for the clicked post
      if (id !== post.$id && post.position['z-index'] > oldIndex) {
        post.position['z-index'] -= 1;
      }
    })
  }

}
