'use strict';

angular.module('todoPostApp')
  .controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.posts = [];

    $http.get('app/data/posts.json').success(function(data) {
      $scope.posts = data;
    });
  }]);
