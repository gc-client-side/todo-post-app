'use strict';

angular.module('todoPostApp')
  .directive('chooseColor', chooseColor);

function chooseColor() {
  return {
    scope: {
      post: '='
    },
    link: link
  };

  function link(scope,element,attr) {
    element.on('click', function() {
      scope.post.color = attr.color;
      scope.$apply();
    })
  }
}
