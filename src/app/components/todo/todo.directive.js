'use strict';

angular.module('todoPostApp')
  .directive('todoPost', function() {
    return {
      replace: true,
      templateUrl: 'app/components/todo/todo.html'
    };
  });
