'use strict';

angular.module('todoPostApp')
  .directive('draggable', ['$document', function($document) {

    function draggable(scope, element, attrs) {
      var id = parseInt(attrs.postId, 10),
        posts = scope.posts,
        pos = posts[id].position,
        moved = false,
        startX,
        startY,
        postX = pos.left,
        postY = pos.top;

      scope.$watch('draggable', function() {
        scope.draggable = true;
      });

      element.on('click', function(e) {
        e.stopPropagation();
        if (!moved) {
          scope.draggable = false;
        }
      });

      element.on('mousedown', function(e) {
        startX= e.pageX - postX;
        startY= e.pageY - postY;

        pos['z-index'] = posts.length;

        if (scope.draggable) {
          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
        }

        angular.forEach(posts, function(post, i) {
          if (i !== id && post.position['z-index'])
            post.position['z-index'] -= 1;
        });
        scope.$apply();
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
        if (pos.left !== postX && pos.top !== postY) {
          moved = true;
          pos.left = postX;
          pos.top = postY;
        } else moved = false;
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }
    }

    return {
      link: draggable
    }

  }]);
