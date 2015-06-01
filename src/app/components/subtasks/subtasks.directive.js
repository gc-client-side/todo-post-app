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
    controller: SubtaskCtrl,
    controllerAs: 'task',
    bindToController: true
  };
}

SubtaskCtrl.$inject = ['$scope', '$firebaseArray', '$timeout'];

function SubtaskCtrl($scope, $firebaseArray, $timeout) {
  var vm = this;
  var ajaxPromise = null;
  vm.subtasks = [];

  // need to watch id, due to new post id updated with promise @addPost()
  $scope.$watch('taskId', function() {
    if ($scope.taskId) {
      var subtasksRef = main.taskList.$ref().child($scope.taskId);
      vm.subtasks = $firebaseArray(subtasksRef);
    }
  });



  // Add, Check, Remove functions
  vm.addSubtask = addSubtask;
  vm.checkSubtask = checkSubtask;
  vm.saveSubtask = saveSubtask;
  vm.removeSubtask = removeSubtask;

  function addSubtask(e) {
    if (e.keyCode === 13 || e.type === 'click') {
      var value = vm.newTask;
      // make sure value is not undefined first before trim()
      if (value && value.trim()) {
        vm.subtasks.$add({
          name: value,
          checked: false
        })
      }
      vm.newTask = '';
      /*if (e.keyCode === 'undefined')
        e.target.parentNode.firstElementChild.focus();*/
    }
  }

  function checkSubtask(key) {
    var subtasks = vm.subtasks;
    subtasks[key].checked = !subtasks[key].checked;
    subtasks.$save(key);
  }

  function saveSubtask(key) {
    if (ajaxPromise)
      $timeout.cancel(ajaxPromise);

    ajaxPromise = $timeout(save, 500);

    function save() {
      vm.subtasks.$save(key);
    }
  }

  function removeSubtask(key) {
    vm.subtasks.$remove(key);
  }

}
