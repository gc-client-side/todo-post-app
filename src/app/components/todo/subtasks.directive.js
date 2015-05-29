'use strict';

angular.module('todoPostApp')
  .directive('subtasks', function() {

    function subtaskCtrl($scope) {
      var tasks = $scope.post.subtasks;

      $scope.newTask = '';

      //handles subtasks added by button click
      $scope.addSubtask = function(e) {
        if (e.keyCode === 13 || e.type === 'click') {
          var value = $scope.newTask.trim();

          if (value) {
            $scope.post.subtasks.push({
              checked: false,
              name: value
            });
            $scope.newTask = '';
          }
          if (e.keyCode === 'undefined')
            e.target.parentNode.firstElementChild.focus();
        }
      };

      $scope.checkSubtask = function(key) {
        tasks[key].checked = true;
      };

      $scope.removeSubtask = function(e, key) {
        tasks.splice(key, 1);
      };
    }

    return {
      scope: {
        post: '=from'
      },
      templateUrl: 'app/components/todo/subtasks.html',
      controller: subtaskCtrl
    }
  })
;
