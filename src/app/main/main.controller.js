'use strict';

angular.module('todoPostApp')
  .controller('MainCtrl', ['$scope', '$http', '$firebaseArray', function ($scope, $http, $firebaseArray) {

	//connect to Firebase
	var ref = new Firebase('https://postodo.firebaseio.com');
	var obj = $firebaseArray(ref);

	//assign data to DOM
	$scope.posts = obj;

	console.log($scope.posts);

	/* listen to data updates emitted by lower level scopes */
	//update individual  post
	$scope.$on('update', function(e, key) {
		$scope.posts.$save(key);
	})
	//update all posts
	$scope.$on('updateAll', function() {
	    var	posts = $scope.posts;

		angular.forEach(posts, function(post) {
			posts.$save(post);	
		});
	})
  }]);
