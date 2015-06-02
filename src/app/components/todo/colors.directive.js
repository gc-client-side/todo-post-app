'use strict';

angular.module('todoPostApp')
  .directive('chooseColor', chooseColor);

function chooseColor() {
  return {
    link: link
  };

  function link(scope,element,attr) {
    element.on('click', function() {
      var vm = scope.td;
      vm.post.color = attr.color;
      vm.posts.$save(vm.key);
      scope.$apply();
    })
  }
}
