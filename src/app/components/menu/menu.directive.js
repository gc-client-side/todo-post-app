'use strict';

angular.module('todoPostApp')
	.directive('tdpMenu', tdpMenu);

function tdpMenu() {
  return {
    replace: true,
    templateUrl: 'app/components/menu/menu.html',
    link: link
  };

  function link(scope) {
    scope.sideMenuOn = false;

    scope.toggleSideMenu = function() {
      scope.sideMenuOn = !scope.sideMenuOn;
    }
  }

}
