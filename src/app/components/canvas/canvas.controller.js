'use strict';

angular.module('todoPostApp')
  .controller('CanvasCtrl', ['$scope', '$http', 'postdrag', '$firebaseObject', function($scope, $http, postdrag, $firebaseArray) {

	var ref = new Firebase('https://postodo.firebaseio.com');
	var obj = $firebaseArray(ref);

	obj.$loaded().then(function() {
	  $scope.posts = obj;
	  postdrag.init(obj);
	  $scope.duringMove = postdrag.duringMove;
	  $scope.endMove = postdrag.endMove;
	})



	  //get Y dista ce of canvas from top of the window
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

	  	}
	  };



    //$scope.$watchCollection('posts', function(newPosts, oldPosts) {
      ////focus cursor on new post title upon push
      ////fire focus event on new posts only
      //if (newPosts.length > oldPosts.length) {
        ////add Title focus callback to the end of queue
        ////otherwise it selects second to last post
        //setTimeout(function() {
          //var newPost = document.getElementById('canvas').lastElementChild;
          //newPost.querySelector('.post-title').focus();
        //}, 0)
      //}
    //});
  }]);
