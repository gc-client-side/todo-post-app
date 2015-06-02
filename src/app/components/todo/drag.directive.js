'use strict';

angular.module('todoPostApp')
  .directive('tdpDrag', tdpDrag);

tdpDrag.$inject = ['$document'];

function tdpDrag($document) {
  return {
    require: 'tdpPost',
    link: link
  };

  function link(scope, element, attrs, td) {
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
    /*var updatePos = scope.onMoved(),
        updateIndices = scope.onFocus();*/

    element.on('mousedown', function(e) {
      mousedown(e);
    });

    function mousedown(e) {
      startX = e.pageX - postX;
      startY = e.pageY - postY;

      var oldIndex = post.position['z-index'],
          topIndex = td.posts.length;
      // if moving same post, do nothing with index
      if (oldIndex !== topIndex) {
        // due to ajax delay, use css to set on top first
        element.css({'z-index': topIndex+1});
        td.updateIndices(oldIndex, topIndex);
      }

      $document.on('mousemove', mousemove);
      $document.on('mouseup', mouseup);
    }

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
      // if moved
      if (post.position.left !== postX && post.position.top !== postY) {
        td.updatePos(postX, postY);
      }
      /*else {
        scope.$emit('dragStatus', false);
      }*/
    }
  } /* end link */
}
