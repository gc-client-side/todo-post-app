'use strict';

angular.module('todoPostApp')
	.controller('tdpFilterCtrl', tdpFilterCtrl)

	tdpFilterCtrl.$inject = ['$rootScope'];

	function tdpFilterCtrl($rootScope) {
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
			var posts = $rootScope.posts;
			angular.forEach(posts, function(post) {
				if (post.checked === true) {
					posts.$remove(post);
				}
			})
		}

	}

