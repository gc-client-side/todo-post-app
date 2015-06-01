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

SubtaskCtrl.$inject = ['$scope', '$firebaseArray', '$timeout'];

function SubtaskCtrl($scope, $firebaseArray, $timeout) {
  var ajaxPromise = null;
  $scope.subtasks = [];

  // need to watch id, due to new post id updated with promise @addPost()
  $scope.$watch('taskId', function() {
    if ($scope.taskId) {
      var subtasksRef = $scope.taskList.$ref().child($scope.taskId);
      $scope.subtasks = $firebaseArray(subtasksRef);
    }
  });



  // Add, Check, Remove functions
  $scope.addSubtask = addSubtask;
  $scope.checkSubtask = checkSubtask;
  $scope.saveSubtask = saveSubtask;
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

  function saveSubtask(key) {
    if (ajaxPromise)
      $timeout.cancel(ajaxPromise);

    ajaxPromise = $timeout(save, 500);

    function save() {
      $scope.subtasks.$save(key);
    }
  }

  function removeSubtask(key) {
    $scope.subtasks.$remove(key);
  }

}
