'use strict';

angular.module('todoPostApp')
  .directive('tdpPost', function() {

    function PostCtrl($scope) {

      $scope.checkPost = function(key) {
        $scope.posts[key].checked = !$scope.posts[key].checked ;
      };

    } /* end controller */

	function link(scope, element, attrs) {
		var id = scope.key;

	  //watch for individual post updates
	  scope.$watch('post', function() {
		  if (!scope.dragging && !scope.typing) {
		  	scope.$emit('update', id);
		  }
	  }, true);
	}

    return {
      replace: true,
      templateUrl: 'app/components/todo/todo.html',
      controller: PostCtrl,
	  link: link
    }
  });
