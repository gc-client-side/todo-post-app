'use strict';

angular.module('todoPostApp')
  .controller('MainCtrl', function ($scope) {
    $scope.posts = [
      {
        title: 'post title',
        description: 'post description'
      },
      {
        title: '2nd title',
        description: 'post description'
      }
    ];
  });
