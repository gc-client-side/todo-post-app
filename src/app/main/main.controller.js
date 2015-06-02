'use strict';

angular
  .module('todoPostApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', '$firebaseArray', 'FBURL', '$rootScope'];


/* @ngInject */
function MainCtrl($scope, $firebaseArray, FBURL, $rootScope) {

  var ref = new Firebase(FBURL),
      postRef = ref.child('posts'),
      tasklistRef = ref.child('tasklist');

  //assign data to DOM
  /* assigned data to rootScope for easier context refactoring */
  $rootScope.posts = $firebaseArray(postRef);
  $rootScope.taskList = $firebaseArray(tasklistRef);

  /* listen to data updates emitted by lower level scopes */
  //update individual  post
  $scope.$on('update', function(e, key) {
    $scope.posts.$save(key);
  });

  //update all postsd
  /*$scope.$on('updateAll', function() {
    var	posts = $scope.posts;

    angular.forEach(posts, function(post) {
      posts.$save(post);
    });
  })*/

  /*$scope.posts.$watch(function(e) {
    console.log(e);
  });*/

}
