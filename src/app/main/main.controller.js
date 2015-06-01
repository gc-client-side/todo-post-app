'use strict';

angular
  .module('todoPostApp')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', '$firebaseArray', 'FBURL'];


/* @ngInject */
function MainCtrl($scope, $firebaseArray, FBURL) {
  var vm = this;

  var ref = new Firebase(FBURL),
      postRef = ref.child('posts'),
      tasklistRef = ref.child('tasklist');

  //assign data to DOM
  vm.posts = $firebaseArray(postRef);
  vm.taskList = $firebaseArray(tasklistRef);
  vm.scopeTest = 'success';

  /* listen to data updates emitted by lower level scopes */
  //update individual  post
  $scope.$on('update', function(e, key) {
    vm.posts.$save(key);
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
