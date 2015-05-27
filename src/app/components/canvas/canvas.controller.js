'use strict';

angular.module('todoPostApp')
  .controller('CanvasCtrl', function ($scope) {

    // post format
    $scope.posts = [
      {
        title: 'Hello post',
        description: 'That is very hello',
	    color: 'yellow',
	    checked: false,
        subtasks: [{checked: false, name: 'be a man'},
	  			   {checked: false, name: 'be a girl'},
	  			   {checked: false, name: 'be a dog'}],
        position: {
          top: 100,
          left: 100,
          'z-index': 1
        }
      },
      {
        title: 'Hello post 2',
        description: 'It is over',
	    color: 'orange',
	    checked: false,
        subtasks: [{checked: true, name: 'go home'},
			 	   {checked: false, name: 'go school'},
				   {checked: false, name: 'be a dog'}],
        position: {
          top: 100,
          left: 350,
          'z-index': 2
        }
      },
      {
        title: 'Hello post 3',
        description: 'not yet',
		color: 'blue',
	    checked: false,
        subtasks: [{checked: true, name: 'go home'},
			 	   {checked: false, name: 'go school'},
				   {checked: false, name: 'be a dog'}],
        position: {
          top: 100,
          left: 600,
          'z-index': 3
        }
      },
      {
        title: 'Hello post 4',
        description: 'actually yes',
		color: 'green',
	    checked: true,
        subtasks: [{checked: true, name: 'go home'},
			 	   {checked: false, name: 'go school'},
				   {checked: false, name: 'be a dog'}],
        position: {
          top: 100,
          left: 850,
          'z-index': 4
        }
      }
    ];

    //post colors
	$scope.colors = ['brown', 'orange', 'blue', 'light-blue',
					 'green', 'purple', 'yellow'];

	$scope.changeColor = function(key, color) {
		$scope.posts[key].color = color;
	}

	  //get Y dista ce of canvas from top of the window
	  //to calculate correct Y-coordinate for new posts
	  var top = document.getElementById('canvas').getClientRects()[0].top;

	  $scope.addPost = function(e) {
	  	//add post when clicking on canvas area only
	  	//make sure nothings dragging
	  	if (e.target.id === "canvas") {
	  		$scope.posts.push({ title: '',
	  						    description: '',
	  						    subtasks: [],
								color: 'yellow',
								position: {
									top: e.clientY - top,
									left: e.clientX,
									'z-index': $scope.posts.length
								}
	  						});
	  	}
	  };

	  $scope.removePost = function(key) {
	  	if (confirm("Are you sure? Deletes are permanent!")) {
	  		$scope.posts.splice(key, 1);
	  	}
	  };

	  $scope.checkPost = function(key) {
      	$scope.posts[key].checked = !$scope.posts[key].checked;		 
	  }

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

	  /* new dragging implementation (ng-style) */

    // initial drag state
    var moveInit = { draggable: false},
        highestIndex = $scope.posts.length;

    $scope.moveState = moveInit;

    // ng-mousedown
    $scope.startMove = function(key, e) {
      var posts = $scope.posts,
          pos = posts[key].position;

      // post being clicked sets on top
      pos['z-index'] = highestIndex;

      $scope.moveState = {
        draggable: true,
        startX: pos.left,
        startY: pos.top,
        clientX: e.clientX,
        clientY: e.clientY,
        key: key
      };

      // rearrange z-index for rest posts
      angular.forEach(posts, function(post, i) {
        if (i != key) // if not the one being clicked
          if (post.position['z-index']) // if z-index not 0
            post.position['z-index'] -= 1;
      });
    };

    // ng-mousemove
	  $scope.duringMove = function(e) {
      e.preventDefault();

      if ($scope.moveState.draggable) {
        var moveState = $scope.moveState,
            post = $scope.posts[moveState.key];

        post.position.top = moveState.startY + (e.clientY - moveState.clientY);
        post.position.left = moveState.startX + (e.clientX - moveState.clientX);
      }
	  };

    // ng-mouseup
    $scope.endMove = function() {
      $scope.moveState = moveInit;
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
