'use strict';

angular.module('todoPostApp')
  .directive('subtasks', subtasks);

/**
 * firebase is better at syncing w/ one list at a time
 * so every subtask list is treated as a 
 * separate entity from the larger list of posts
 */

function subtasks() {
  // directive config
  return {
    scope: {
      taskList: '=',
      taskId: '='
    },
    templateUrl: 'app/components/subtasks/subtasks.html',
    controller: SubtaskCtrl,
    controllerAs: 'st',
    bindToController: true
  };
}

SubtaskCtrl.$inject = ['$interval', 'subtaskService'];

function SubtaskCtrl($interval, subtaskService) {
  var vm = this;
  var loadSubtasks = $interval(checkId, 200);

  // CRUD operations
  vm.addSubtask = addSubtask;
  vm.checkSubtask = checkSubtask;
  vm.saveSubtask = saveSubtask;
  vm.removeSubtask = removeSubtask;

  function checkId() {
    if (vm.taskId) {
      vm.subtasks = subtaskService.loadSubtasks(vm.taskList, vm.taskId);
      $interval.cancel(loadSubtasks);
    } else {
      vm.subtasks = [];
    }
  }

  // add subtask upon pressing enter key or clicking the plus btn
  function addSubtask(e) {
    if (e.keyCode === 13 || e.type === 'click') {
      subtaskService.addSubtask(vm.subtasks, vm.newTask);
      vm.newTask = '';
    }
  }

  function checkSubtask(key) {
    subtaskService.checkSubtask(vm.subtasks, key);
  }

  function saveSubtask(key) {
      subtaskService.saveSubtask(vm.subtasks, key);
  }

  function removeSubtask(key) {
    subtaskService.removeSubtask(vm.subtasks, key);
  }
}
