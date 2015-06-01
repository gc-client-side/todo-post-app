'use strict';

angular.module('todoPostApp')
  .directive('tdpPost', tdpPost);

function tdpPost() {
  return {
    replace: true,
    templateUrl: 'app/components/todo/todo.html',
    controller: TodoCtrl,
    link: link
  };

  function link(scope, element, attrs) {
    var id = scope.key;

    //watch for individual post updates
    scope.$watch('post.position', function() {
      scope.$emit('update', id);
    }, true);
  }
}


function TodoCtrl($scope, $timeout) {
  var postPromise = null;
  var post = $scope.post;

  $scope.checkPost = checkPost;
  $scope.savePost = savePost;
  $scope.updatePos = updatePos;
  $scope.updateIndices = updateIndices;

  function checkPost(key) {
    post.checked = !post.checked ;
    $scope.posts.$save(key);
  }

  function savePost(key) {
    if (postPromise)
      $timeout.cancel(postPromise);
    postPromise = $timeout(save, 500);

    function save() {
      $scope.posts.$save(key);
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
    angular.forEach($scope.posts, function(post) {
      // not to set z-index again for the clicked post
      if (id !== post.$id && post.position['z-index'] > oldIndex) {
        post.position['z-index'] -= 1;
      }
    })
  }

}
