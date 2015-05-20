'use strict';

angular.module('todoPostApp')
  .controller('CanvasCtrl', function ($scope) {
    $scope.posts = [
    	{ id: 1, title: 'Hello post' },
    	{ id: 2, title: 'Hello post 2' }
    ];
  });
