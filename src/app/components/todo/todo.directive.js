'use strict';

angular.module('todoPostApp')
  .directive('tdpPost', ['$document', function($document) {

    function postCtrl($scope) {

      $scope.checkPost = function(key) {
        $scope.posts[key].checked = true;
      };

      //handles enter key from any field on the post
      $scope.handleEnter = function(e, key) {
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
          } /*else if (field.className.search("subtaskInput") > -1) {
            var value = field.value.trim();

            //make sure there's a value before adding subtask
            if (value !== '') {
              $scope.posts[key].subtasks.push({
                checked: false,
                name: value
              });
              field.value = '';
            }
          }*/
        }
        //blur on esc key
        else if (e.keyCode === 27) {
          var active = document.activeElement;
          active.blur();
        }
      };
    } /* end controller */

    return {
      replace: true,
      templateUrl: 'app/components/todo/todo.html',
      controller: postCtrl
    }
  }])
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
;
