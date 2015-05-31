'use strict';

angular.module('todoPostApp')
  .directive('subtasks', subtasks);

//subtasks.$inject = ['$firebaseArray'];

function subtasks() {
  // directive config
  return {
    scope: {
      taskId: '=',
      taskList: '='
    },
    templateUrl: 'app/components/subtasks/subtasks.html',
    controller: SubtaskCtrl
  };
}

SubtaskCtrl.$inject = ['$scope', '$firebaseArray'];

function SubtaskCtrl($scope, $firebaseArray) {
  //console.log($scope.taskId);
  $scope.subtasks = [];

  // need to watch id, due to new post id updated with promise
  $scope.$watch('taskId', function() {
    if ($scope.taskId) {
      var subtasksRef = $scope.taskList.$ref().child($scope.taskId);
      $scope.subtasks = $firebaseArray(subtasksRef);
    }
  });

  // Add, Check, Remove functions
  $scope.addSubtask = addSubtask;
  $scope.checkSubtask = checkSubtask;
  $scope.removeSubtask = removeSubtask;

  function addSubtask(e) {
    if (e.keyCode === 13 || e.type === 'click') {
      var value = $scope.newTask;
      // make sure value is not undefined first before trim()
      if (value && value.trim()) {
        $scope.subtasks.$add({
          name: value,
          checked: false
        })
      }
      $scope.newTask = '';
      /*if (e.keyCode === 'undefined')
        e.target.parentNode.firstElementChild.focus();*/
    }
  }

  function checkSubtask(key) {
    var subtasks = $scope.subtasks;
    subtasks[key].checked = !subtasks[key].checked;
    subtasks.$save(key);
  }

  function removeSubtask(key) {
    $scope.subtasks.$remove(key);
  }

}
