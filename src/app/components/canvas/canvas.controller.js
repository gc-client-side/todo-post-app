'use strict';


angular.module('todoPostApp')
  .controller('CanvasCtrl', ['$scope', '$http', 'postdrag', '$firebaseArray', function($scope, $http, postdrag, $firebaseArray) {

	var ref = new Firebase('https://postodo.firebaseio.com');
	var obj = $firebaseArray(ref);

	  $scope.posts = obj;

	  //get Y distance of canvas from top of the window
	  //to calculate correct Y-coordinate for new posts
	  var top = document.getElementById('canvas').getClientRects()[0].top;

	  $scope.addPost = function(e) {

	  	//add post when clicking on canvas area only
	  	//make sure nothings dragging
	  	if (e.target.id === "canvas") {

			  $scope.posts.$add({ title: '',
						 description: '',
						 subtasks: [],
						 color: 'yellow',
						 position: {
								top: e.clientY - top,
								left: e.clientX,
								'z-index': $scope.posts.length
								}
						 });

			  setTimeout(function() {
				  var newPost = document.getElementById('canvas').lastElementChild;
				  newPost.querySelector('.post-title').focus();
			  }, 0);

	  	}
	  };

	  //save to firebase
	  $scope.saveChange = function(key) {
		    $scope.posts.$save(key);
	  }

	  //initialize drag events
	  postdrag.init(obj, $scope.saveChange);
	  $scope.duringMove = postdrag.duringMove;
	  $scope.endMove = postdrag.endMove;
  }]);
