'use strict';

angular.module('todoPostApp')
	.directive('tdpMenu', function() {

    function menuLink(scope) {
      scope.sideMenuOn = false;

      scope.toggleSideMenu = function() {
        scope.sideMenuOn = !scope.sideMenuOn;
      }
    }

		return {
			replace: true,
			templateUrl: 'app/components/menu/menu.html',
      link: menuLink
		};

	});
