'use strict';

angular.module('todoPostApp')
	.directive('appMenu', function() {

		function menuCtrl($scope) {
			$scope.sideMenuOn = false;

    	$scope.toggleSideMenu = function() {
    		$scope.sideMenuOn ? $scope.sideMenuOn = false : $scope.sideMenuOn = true;
    	};
		}

		return {
			replace: true,
			templateUrl: 'app/components/menu/menu.html',
			controller: menuCtrl
		};
	});