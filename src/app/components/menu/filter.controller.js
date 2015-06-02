'use strict';

angular.module('todoPostApp')
	.controller('tdpFilterCtrl', tdpFilterCtrl)

	tdpFilterCtrl.$inject = ['$rootScope', 'postService'];

	function tdpFilterCtrl($rootScope, postService) {
		var vm = this;

		vm.toggleActive = toggleActive;
		vm.filterAll = filterAll;
		vm.filterActive = filterActive;
		vm.filterCompleted = filterCompleted;
		vm.clearCompleted = clearCompleted;

		function toggleActive(e) {
			var filters = angular.element(e.currentTarget).children();
			var selected = e.target;

			filters.removeClass('active');
			selected.className += ' active';
		}

		function filterAll(e) {
			$rootScope.filterState = '';	
		}

		function filterActive(e) {
			$rootScope.filterState = false;	
		}

		function filterCompleted(e) {
			$rootScope.filterState = true;	
		}

		function clearCompleted() {
			postService.removeCheckedPosts();
		}

	}

