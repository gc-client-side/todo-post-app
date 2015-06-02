'use strict';

angular.module('todoPostApp')
	.directive('tdpMenu', tdpMenu);

function tdpMenu() {
  return {
    replace: true,
    templateUrl: 'app/components/menu/menu.html',
    controller: MenuController,
	controllerAs: 'tdpMenu'
  };

  MenuController.$inject = ['$scope'];

  function MenuController($scope) {
	var vm = this;
    vm.sideMenuOn = false;
    vm.toggleSideMenu = toggleSideMenu; 

	function toggleSideMenu() {
      vm.sideMenuOn = !vm.sideMenuOn;
	}
  }
}
