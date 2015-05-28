'use strict';

angular.module('todoPostApp')
  .directive('tdpPost', ['$document', function($document) {

    function postCtrl($scope) {
      //post colors
      $scope.colors = ['brown', 'orange', 'blue', 'light-blue',
        'green', 'purple', 'yellow'
      ];

      $scope.changeColor = function(key, color) {
        $scope.posts[key].color = color;
      };

      $scope.checkPost = function(key) {
        $scope.posts[key].checked = true;
      };

      $scope.removeSubtask = function(e, key, stKey) {

        $scope.posts[key].subtasks.splice(stKey, 1);
      };

      $scope.checkSubtask = function(e, key, stKey) {
        e.target.parentNode.className += " checked";
      };

      //handles subtasks added by button click
      $scope.addSubtask = function(e, key) {
        e.preventDefault();

        var input = e.target.parentNode.firstElementChild,
          value = input.value.trim();

        if (value !== '') {
          $scope.posts[key].subtasks.push({
            checked: false,
            name: value
          });
          input.value = '';
          input.focus();
        }
      };

      //clears subtask field on blur
      $scope.clearSubtaskInput = function(e) {
        //slight delay required so that subtask button has an effect
        setTimeout(function() {
          e.target.value = '';
        }, 50);
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
          } else if (field.className.search("subtaskInput") > -1) {
            var value = field.value.trim();

            //make sure there's a value before adding subtask
            if (value !== '') {
              $scope.posts[key].subtasks.push({
                checked: false,
                name: value
              });
              field.value = '';
            }
          }
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
  }]);
