'use strict';

angular.module('todoPostApp')
  .directive('subtasks', function() {

    function subtaskCtrl($scope) {
	  var post = $scope.post;

      $scope.newTask = '';

      //handles subtasks added by button click
      $scope.addSubtask = function(e) {
        if (e.keyCode === 13 || e.type === 'click') {
			  var value = $scope.newTask.trim();

			  //make sure subtask array exists
			  if (!post.subtasks) {
				  post.subtasks = [];
			  }

			  if (value) {
				post.subtasks.push({
				  checked: false,
				  name: value
				});
			  }

               $scope.newTask = '';
         }
          if (e.keyCode === 'undefined')
            e.target.parentNode.firstElementChild.focus();
      }

      $scope.checkSubtask = function(key) {
		//direct access to update firebase arrays
        post.subtasks[key].checked = true;
      };

      $scope.removeSubtask = function(e, key) {
        post.subtasks.splice(key, 1);
      };

	  //watch for subtask updates
	  $scope.$watchCollection('post.subtasks', function() {
			  $scope.$emit('update', $scope.key);
	  }, true);

    };

    return {
      scope: {
        post: '=',
		key: '=' 
      },
      templateUrl: 'app/components/todo/subtasks.html',
      controller: subtaskCtrl
    }
  })
;
