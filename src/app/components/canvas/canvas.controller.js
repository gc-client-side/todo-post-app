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

	$scope.addPost = function(e) {
		//add post when clicking on canvas area only
		if (e.target.id === "canvas") {
			$scope.posts.push({ title: '',
							    description: '',
							    subtasks: [],
							    x: e.clientX,
							    y: e.clientY - top
							});

		}
	};

	//mouse dragging state
	var dragElem = undefined,
		startLeft = undefined,
		startTop = undefined,
		startX = undefined,
		startY = undefined;

	$scope.startMove = function(e) {
		e.preventDefault();
		dragElem = e.currentTarget;

		//store drag state in current post so that
		//event doesn't fire on other posts
		dragElem.dragging = true;
		//move dragged element to the top
		dragElem.style.zIndex = $scope.posts.length;

		startLeft = parseFloat(dragElem.style.left);
		startTop = parseFloat(dragElem.style.top); 
		startX = e.clientX;
		startY = e.clientY - top;
	};

	$scope.movePost = function(e) {
		e.preventDefault();

		if (typeof dragElem !== "undefined" && dragElem.dragging) {
			dragElem.style.left = e.clientX - startX + startLeft + 'px';		
			dragElem.style.top = e.clientY - top - startY + startTop + 'px';		
		}	
	};

	$scope.endMove = function(e, key) {
		var temp;

		e.currentTarget.dragging = false;

		//save post x and y coordinates
		$scope.posts[key].x = e.clientX - startX + startLeft;
		$scope.posts[key].y = e.clientY - top - startY + startTop;
		console.log($scope.posts[key]);

		//exchange dragged post with last post to update order (and z-index)
		temp = $scope.posts[key];
		$scope.posts[key] = $scope.posts[$scope.posts.length-1]; 
		$scope.posts[$scope.posts.length-1] = temp;
		console.log($scope.posts);
	};
	
	$scope.$watchCollection('posts', function(newPosts, oldPosts) {

		//focus cursor on new post title upon push
		//fire focus event on new posts only
		if (newPosts.length > oldPosts.length) {
			//add Title focus callback to the end of queue
			//otherwise it selects second to last post 
			setTimeout(function() {
				var newPost = document.getElementById('canvas').lastElementChild;
				console.log(newPost);
				newPost.querySelector('.post-title').focus();
			}, 0)
		}
	});
  });
