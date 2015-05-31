'use strict';

angular
  .module('todoPostApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', '$firebaseArray', 'FBURL'];


/* @ngInject */
function MainCtrl($scope, $firebaseArray, FBURL) {

  var ref = new Firebase(FBURL),
      postRef = ref.child('posts'),
      tasklistRef = ref.child('tasklist');

  //assign data to DOM
  $scope.posts = $firebaseArray(postRef);
  $scope.taskList = $firebaseArray(tasklistRef);

  /* listen to data updates emitted by lower level scopes */
  //update individual  post
  $scope.$on('update', function(e, key) {
    $scope.posts.$save(key);
  });

  //update all posts
  $scope.$on('updateAll', function() {
    var	posts = $scope.posts;

    angular.forEach(posts, function(post) {
      posts.$save(post);
    });
  })

}
