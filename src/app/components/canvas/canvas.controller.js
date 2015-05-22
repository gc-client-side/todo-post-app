'use strict';

angular.module('todoPostApp')
  .controller('CanvasCtrl', function ($scope) {
    $scope.posts = [
		{ title: 'Hello post',
		  description: 'That is very hello',
    	  subtasks: ['be a man', 'be a girl', 'be a dog'],
		  x: 100,
		  y: 100
    	},
    	{ title: 'Hello post 2',
    	  description: 'It is over',
    	  subtasks: ['go home', 'go school', 'be a dog'],
		  x: 350,
		  y: 100
    	},
    	{ title: 'Hello post 2',
    	  description: 'It is over',
    	  subtasks: ['go home', 'go school', 'be a dog'],
		  x: 600,
		  y: 100
    	},
    	{ title: 'Hello post 2',
    	  description: 'It is over',
    	  subtasks: ['go home', 'go school', 'be a dog'],
		  x: 850,
		  y: 100
    	}
    ];


	//get Y distance of canvas from top of the window
	//to calculate correct Y-coordinate for new posts
	var top = document.getElementById('canvas').getClientRects()[0].top; 

	//mouse dragging state
	var dragElem = undefined,
		dragging = false,
		startLeft = undefined,
		startTop = undefined,
		startX = undefined,
		startY = undefined;

	$scope.addPost = function(e) {
		//add post when clicking on canvas area only
		//make sure nothings dragging
		if (e.target.id === "canvas" && !dragging) {
			$scope.posts.push({ title: '',
							    description: '',
							    subtasks: [],
							    x: e.clientX,
							    y: e.clientY - top
							});

		}
	};

	//handles subtasks added by button click
	$scope.addSubtask = function(e, key) {
		var input = e.target.parentNode.firstElementChild,
			value = input.value.trim();

		if (value !== '') {
			$scope.posts[key].subtasks.push(value);
			input.value = '';
		}
	}

	//clears subtask field on blur
	$scope.clearSubtaskInput = function(e) {
		e.target.value = '';
	}

	//handles enter key from any field on the post
	$scope.handleEnter = function(e, key) {
		if (e.keyCode === 13) {
			var field = e.target,
				post = e.currentTarget,
				next;

			if (field.className.search("post-title") > -1) {
				next = post.querySelector(".post-description");

				//if description is empty, focus 
				if (next.value.trim() === '') {
					post.querySelector(".post-description").focus();
				}
				else {
					field.blur();
				}
			}
			else if (field.className.search("post-description") > -1) {
				post.querySelector(".subtaskInput").focus();
			}
			else if (field.className.search("subtaskInput") > -1) {
				var value = field.value.trim();

				//make sure there's a value before adding subtask	
				if (value !== '') {
					$scope.posts[key].subtasks.push(value);
					field.value = '';
				}
			}
		}
		//blur on esc key
		else if (e.keyCode === 27) {
			var active = document.activeElement;
			document.activeElement.blur();
		}
	};

	//stops drag events if post is being edited 
	$scope.preventDrag = function() {
		setTimeout(function() {
			dragging = false;	
		}, 0)
	};

	$scope.startMove = function(e) {
		/* should we have a drag tab
		 * or an edit button?
		 */
		//e.preventDefault();
		dragElem = e.currentTarget;
		dragging = true;

		//move dragged element to the top
		dragElem.style.zIndex = $scope.posts.length;

		startLeft = parseFloat(dragElem.style.left);
		startTop = parseFloat(dragElem.style.top); 
		startX = e.clientX;
		startY = e.clientY - top;
	};

	$scope.movePost = function(e) {
		e.preventDefault();

		if (dragging) {
			dragElem.style.left = e.clientX - startX + startLeft + 'px';		
			dragElem.style.top = e.clientY - top - startY + startTop + 'px';		
		}	
	};

	$scope.endMove = function(e, key) {
		if (dragging) {
			var temp;

			e.currentTarget.dragging = false;

			//end drag state
			dragging = false;

			//save post x and y coordinates
			$scope.posts[key].x = e.clientX - startX + startLeft;
			$scope.posts[key].y = e.clientY - top - startY + startTop;

			//bring dragged post to the end to update z-indices
			temp = $scope.posts.splice(key, 1);
			$scope.posts = $scope.posts.concat(temp);
		}
	};
	
	$scope.$watchCollection('posts', function(newPosts, oldPosts) {

		//focus cursor on new post title upon push
		//fire focus event on new posts only
		if (newPosts.length > oldPosts.length) {
			//add Title focus callback to the end of queue
			//otherwise it selects second to last post 
			setTimeout(function() {
				var newPost = document.getElementById('canvas').lastElementChild;
				newPost.querySelector('.post-title').focus();
			}, 0)
		}
	});
  });
