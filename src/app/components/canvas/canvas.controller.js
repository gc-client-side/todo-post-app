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

	//mouse dragging state
	var dragging = false,
		startX = undefined,
		startY = undefined;

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

	$scope.startMove = function(e) {
		dragging = true;
		startX = e.clientX;
		startY = e.clientY - top;
	}

	$scope.movePost = function(e) {
		if (dragging) {
			e.target.style.left = parseFloat(e.target.style.left) + e.clientX - startX + 'px';		
			e.target.style.top = parseFloat(e.target.style.top) + (e.clientY - top) - startY + 'px';		
		}	
	}

	$scope.endMove = function() {
		dragging = false;
		startX = undefined;
		startY = undefined;
	}
	
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
