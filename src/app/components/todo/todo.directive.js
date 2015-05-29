'use strict';

angular.module('todoPostApp')
  .directive('tdpPost', function() {

    function postCtrl($scope) {
	  
      $scope.checkPost = function(key) {
        $scope.posts[key].checked = !$scope.posts[key].checked ;
      };

    } /* end controller */

	function postLink(scope, element, attrs) {
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
      controller: postCtrl,
	  link: postLink
    }
  })
  .directive('chooseColor', function() {
    return {
      scope: {
        post: '='
      },
      link: function(scope,element,attr) {
        element.on('click', function() {
          scope.post.color = attr.color;
          scope.$apply();
        })
      }
    }
  })
  .directive('handleKeys', function($timeout) {
    return {
      link: function(scope, element) {
		//key state for firing updates 
		scope.typing = false;

        element.on('keydown', function(e) {
		  scope.typing = true;

          if (e.keyCode === 13) {

            var field = e.target,
                post = e.currentTarget,
                next;

            if (field.className.search("post-title") > -1) {
              next = post.querySelector(".post-description");

              //if description is empty, focus
              if (next.value.trim() === '') {
                //prevent line skip
                e.preventDefault();
                next.focus();
              } else {
                field.blur();
              }
            }
          }
          //blur on esc key
          else if (e.keyCode === 27) {
            var active = document.activeElement;
            active.blur();
          }
        });

		element.on('keyup', function(e) {
			$timeout(function() {
				scope.typing = true;
				//update post
				scope.$emit('update', scope.key);
			}, 500);	
		});
      }
    }
  })
;
