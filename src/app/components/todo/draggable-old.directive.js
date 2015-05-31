'use strict';

angular.module('todoPostApp')
  .directive('draggableOld', ['$document', function($document) {

    function draggable(scope, element, attrs) {
	  var id = parseInt(attrs.postId, 10),
        posts = scope.posts,
        pos = posts[id].position,
        moved = false,
        startX,
        startY,
        postX = pos.left,
        postY = pos.top;

  	  //drag state checked for lower level post updates
	  scope.dragging = false;

      scope.$watch('draggable', function() {
        scope.draggable = true;
      });

      element.on('click', function(e) {
        e.stopPropagation();
        if (!moved) {
		  scope.dragging = true;
          scope.draggable = false;
        }
      });

      element.on('mousedown', function(e) {
        startX= e.pageX - postX;
        startY= e.pageY - postY;

		//***direct array access required for firebase arrays
		//can't cache nested arrays
		posts[id].position['z-index'] = posts.length;

        if (scope.draggable) {
          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
        }

		//update z-indices
		scope.$apply(function() {
			angular.forEach(posts, function(post, i) {
				var z = post.position['z-index'];
				if (z > 0) {
					post.position['z-index'] -= 1;
				}
			})

		})

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

		  scope.$apply(function() {
			  posts[id].position.left = postX;
			  posts[id].position.top = postY;
		  });

		  //revert drag state
		  scope.dragging = false;

		  //update all posts
		  scope.$emit('updateAll');

		} else {
			moved = false;
		}

        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);

      }
    }

    return {
      link: draggable
    }

  }]);
