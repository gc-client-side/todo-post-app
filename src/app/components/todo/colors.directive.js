'use strict';

angular.module('todoPostApp')
  .directive('chooseColor', function() {
    return {
      scope: {
        post: '='
      },
      link: function(scope,element,attr) {
        element.on('click', function() {
          scope.post.color = attr.color;
          scope.$apply();
        })
      }
    }
  });
