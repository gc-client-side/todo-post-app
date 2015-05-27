angular.module('todoPostApp')

.factory('postdrag', function() {
	var module = {},
		moveState = { draggable: false },
		_posts,
		_currPost;

	module.init = function(posts) {
		_posts = posts;	
	}

	module.startMove = function(key, e) {
	  _currPost = _posts[key];

      var pos = _currPost.position;

      // post being clicked sets on top
      pos['z-index'] = _posts.length;

      moveState = {
        draggable: true,
        startX: pos.left,
        startY: pos.top,
        clientX: e.clientX,
        clientY: e.clientY,
        key: key
      };

	  // rearrange z-indices
	  angular.forEach(_posts, function(post, i) {
		  if (i !== key && post.position['z-index']) { // if not the one being clicked, and z-index is not 0
			post.position['z-index'] -= 1;
		  } 
	  });
	}

	module.duringMove = function(e) {
	  e.preventDefault();

      if (moveState.draggable) {
        _currPost.position.top = moveState.startY + (e.clientY - moveState.clientY);
        _currPost.position.left = moveState.startX + (e.clientX - moveState.clientX);
      }
	}

	module.endMove = function() {
		moveState = {draggable: false};
	}

	return module;
})

.factory('postdata', function() {
	
})
