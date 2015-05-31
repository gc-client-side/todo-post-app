'use strict';

angular.module('todoPostApp')
  .directive('draggable', draggable);

draggable.$inject = ['$document'];

function draggable($document) {
  return {
    scope: {
      onMoved: '&',
      onFocus: '&',
      post: '=',
      length: '='
    },
    link: link,
    controller: DraggableCtrl
  };

  function link(scope, element, attrs) {
    // init variables
    var post = scope.post,
        pos = post.position,
        startX,
        startY,
        postX = pos.left,
        postY = pos.top;
    /**
     * init callback expression
     *
     * how to pass in argument to expression:
     * http://stackoverflow.com/questions/17556703/angularjs-directive-call-function-specified-in-attribute-and-pass-an-argument-to
     */
    var updatePos = scope.onMoved(),
        updateIndices = scope.onFocus();

    element.on('mousedown', function(e) {
      startX = e.pageX - postX;
      startY = e.pageY - postY;

      var oldIndex = scope.post.position['z-index'];
      // if moving same post, do nothing with index
      if (oldIndex !== scope.length) {
        // due to ajax delay, use css to set on top first
        element.css({'z-index': scope.length+1});
        post.position['z-index'] = scope.length; // refact
        updateIndices(oldIndex);
      }

      $document.on('mousemove', mousemove);
      $document.on('mouseup', mouseup);
    });

    function mousemove(e) {
      e.preventDefault();

      postX = e.pageX - startX;
      postY = e.pageY - startY;
      element.css({
        top: postY + 'px',
        left: postX + 'px'
      });
    }

    function mouseup() {
      $document.off('mousemove', mousemove);
      $document.off('mouseup', mouseup);

      if (post.position.left !== postX && post.position.top !== postY) // if moved
        updatePos(postX, postY);
    }

  }
}


function DraggableCtrl($scope) {
  $scope.click = 232;
}
