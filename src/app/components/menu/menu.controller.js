'use strict';

angular.module('todoPostApp')
  .controller('MenuCtrl', function ($scope) {
    $scope.sideMenuOn = false;

    $scope.toggleSideMenu = function() {
      $scope.sideMenuOn ? $scope.sideMenuOn = false : $scope.sideMenuOn = true;
    };
  });
