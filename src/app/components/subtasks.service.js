'use strict';

angular
  .module('todoPostApp')
  .factory('subtaskService', subtaskService);

subtaskService.$inject = ['$firebaseArray', '$timeout'];

/* @ngInject */
function subtaskService($firebaseArray, $timeout) {
  var ajaxPromise;

  return {
    loadSubtasks: loadSubtasks,
    addSubtask: addSubtask,
    checkSubtask: checkSubtask,
    saveSubtask: saveSubtask,
    removeSubtask: removeSubtask
  };

  ////////////////

  function loadSubtasks(taskList, taskId) {
    return $firebaseArray(taskList.$ref().child(taskId));
  }

  function addSubtask(subtasks, value) {
    // make sure value is not undefined first before trim()
    if (value && value.trim()) {
      subtasks.$add({
        name: value,
        checked: false
      });
    }
  }

  function checkSubtask(subtasks, key) {
    subtasks[key].checked = !subtasks[key].checked;
    subtasks.$save(key);
  }

  function saveSubtask(subtasks, key) {
    if (ajaxPromise)
      $timeout.cancel(ajaxPromise);

    ajaxPromise = $timeout(save, 500);

    function save() {
      subtasks.$save(key);
    }
  }

  function removeSubtask(subtasks, key) {
    subtasks.$remove(key);
  }

}
