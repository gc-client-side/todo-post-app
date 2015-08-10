/**
 * Subtask Service
 * @namespace Services
 */
'use strict';

angular
  .module('todoPostApp')
  .factory('subtaskService', subtaskService);

subtaskService.$inject = ['$firebaseArray', '$timeout'];

/**
 * @namespace Subtask
 * @desc subtask functions that can be used across the app
 */
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

  // load subtask from cloud storage to local array 
  function loadSubtasks(taskList, taskId) {
    return $firebaseArray(taskList.$ref().child(taskId));
  }

  // function for adding subtasks
  function addSubtask(subtasks, value) {
    // make sure value is not undefined first before trim()
    if (value && value.trim()) {
      subtasks.$add({
        name: value,
        checked: false
      });
    }
  }

  // complete subtask, check and uncheck
  function checkSubtask(subtasks, key) {
    subtasks[key].checked = !subtasks[key].checked;
    subtasks.$save(key);
  }

  // save subtask to database
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
