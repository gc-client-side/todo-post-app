'use strict';

angular.module('todoPostApp')
  .directive('subtasks', subtasks);

//subtasks.$inject = ['$firebaseArray'];

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

SubtaskCtrl.$inject = ['$firebaseArray', '$timeout', '$interval'];

function SubtaskCtrl($firebaseArray, $timeout, $interval) {
  var vm = this,
      ajaxPromise,
      loadSubtasks;

  loadSubtasks = $interval(checkId, 200);

  function checkId() {
    if (vm.taskId) {
      vm.subtasks = $firebaseArray(vm.taskList.$ref().child(vm.taskId));
      $interval.cancel(loadSubtasks);
    } else {
      vm.subtasks = [];
    }
  }

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
