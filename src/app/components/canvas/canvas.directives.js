'use strict';

angular.module('todoPostApp')
.directive('post', ['postdrag', function(postdrag) {

	return {
		scope: true,
		restrict: 'AE',
		replace: true,
		link: function($scope) {

		  //mostly blur and focus action
		  $scope.handleKeydown = function(e, key) {
			if (e.keyCode === 13) {

				var field = e.target,
					post = e.currentTarget,
					next;

				if (field.className.search("post-title") > -1) {
					next = post.querySelector(".post-description");

					//if description is empty, focus
					if (next.value.trim() === '') {
						//prevent line skip
						e.preventDefault();
						next.focus();
					}
					else {
						field.blur();
					}
				}
				else if (field.className.search("subtaskInput") > -1) {
					var value = field.value.trim();

					//make sure there's a value before adding subtask
					if (value !== '') {
						$scope.posts[key].subtasks.push({ checked: false,
														  name: value });
						field.value = '';
					}
				}
			}
			//blur on esc key
			else if (e.keyCode === 27) {
				var active = document.activeElement;
				active.blur();
			}
		  };

		  $scope.startMove = postdrag.startMove;
		},
		templateUrl: 'app/components/canvas/post.html'	
	};
}])

.directive('postColors', function() {

	return {
		scope: true,
		restrict: 'AE',
		replace: true,
		link: function($scope) {

			$scope.colors = ['brown', 'orange', 'blue', 'light-blue',
					 'green', 'purple', 'yellow'];

			$scope.changeColor = function(key, color) {
				$scope.posts[key].color = color;
			};

		},
		templateUrl: 'app/components/canvas/postcolors.html'	
	};
})


.directive('postButtons', function() {
	
	return {
		scope: true,
		restrict: 'AE',
		replace: true,
		link: function($scope) {

			  $scope.removePost = function(key) {
				if (confirm("Are you sure? Deletes are permanent!")) {
					$scope.posts.splice(key, 1);
				}
			  };

			  $scope.checkPost = function(key) {
				$scope.posts[key].checked = !$scope.posts[key].checked;		 
			  }
		},
		templateUrl: 'app/components/canvas/postbuttons.html'	
	};
})

.directive('subtasks', function() {
	return {
		scope: true,
		restrict: 'AE',
		replace: true,
		link: function($scope) {

		  $scope.removeSubtask = function(e, key, stKey) {
			$scope.posts[key].subtasks.splice(stKey, 1);
		  };

		  $scope.checkSubtask = function(e, key, stKey) {
			e.target.parentNode.className += " checked";
		  };

		  //handles subtasks added by button click
		   $scope.addSubtask = function(e, key) {
	   			e.preventDefault();

				var input = e.target.parentNode.firstElementChild,
					value = input.value.trim();

				if (value !== '') {
					$scope.posts[key].subtasks.push({checked: false,
													 name: value});
					input.value = '';
					input.focus();
				}
	  	   };

		  //clears subtask field on blur
		  $scope.clearSubtaskInput = function(e) {
			//slight delay required so that subtask button has an effect
			setTimeout(function() {
				e.target.value = '';
			}, 50);
		  };

		},
		templateUrl: 'app/components/canvas/subtasks.html'	
	};
});
