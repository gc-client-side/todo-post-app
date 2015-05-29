'use strict';

angular.module('todoPostApp')
  .directive('tdpPost', function() {

    function postCtrl($scope) {

      $scope.checkPost = function(key) {
        $scope.posts[key].checked = true;
      };
    } /* end controller */

    return {
      replace: true,
      templateUrl: 'app/components/todo/todo.html',
      controller: postCtrl
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
  .directive('handleEnter', function() {
    return {
      link: function(scope, element) {
        element.on('keydown', function(e) {
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
      }
    }
  })
;
