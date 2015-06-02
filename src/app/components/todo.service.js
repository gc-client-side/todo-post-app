'use strict';

angular
  .module('todoPostApp')
  .factory('postService', postService);

postService.$inject = ['$firebaseArray', 'FBURL', '$timeout'];

/* @ngInject */
function postService($firebaseArray, FBURL, $timeout) {
  var ref = new Firebase(FBURL),
      postRef = ref.child('posts'),
      tasklistRef = ref.child('tasklist'),
      postPromise,
      colors = ['brown', 'orange', 'blue', 'light-blue',
      'green', 'purple', 'yellow'];

  var posts = $firebaseArray(postRef),
      taskList = $firebaseArray(tasklistRef);

  return {
    postColors: colors,
    posts: posts,
    taskList: taskList,
    addPost: addPost,
    checkPost: checkPost,
    savePost: savePost,
    removePost: removePost,
	removeCheckedPosts: removeCheckedPosts,
    updatePosition: updatePosition,
    updateIndices: updateIndices
  };

  ////////////////

  function addPost(e) {
    if (e.target.id === "canvas") {
      _addToFirebase(e.pageY, e.pageX);
    }
  }

  function checkPost(key) {
    posts[key].checked = !posts[key].checked;
    posts.$save(key);
  }

  function savePost(key) {
	if (postPromise) {
      $timeout.cancel(postPromise);
	} 
    postPromise = $timeout(save, 500);

    function save() {
      posts.$save(key);
    }
  }


  function removePost(key, taskId) {
    if (confirm("Are you sure? Deletes are permanent!")) {
	  _removeFromFirebase(key, taskId);
    }
  }

  function removeCheckedPosts() {
    if (confirm("Are you sure? Deletes are permanent!")) {
		angular.forEach(posts, function(post, key) {
			if (post.checked === true) {
				_removeFromFirebase(key, post.taskId);		
			}
		});  
    }
  }

  function updatePosition(key, left, top) {
    posts[key].position.left = left;
    posts[key].position.top = top;
    posts.$save(key);
  }

  function updateIndices(key, oldIndex, topIndex) {
    /**
     * new implementation where index decrease by 1 only if greater than the one being moved
     *
     * problem solved:
     *  moving same post multiple times changes others' indices
     *  clicking between 2 posts changes others' indices
     *  now removing a post also re-index
     */
    posts[key].position['z-index'] = topIndex;
    posts.$save(key);
    angular.forEach(posts, reIndex);

    function reIndex(post, id) {
      if (id !== key && post.position['z-index'] > oldIndex) {
        post.position['z-index'] -= 1;
        posts.$save(id);
      }
    }
  }

  /** 
   * Private methods  
   **/

  function _addToFirebase(top, left) {
    // new post model
    var newPost = {
  	title: '',
  	description: '',
  	color: colors[Math.floor(Math.random()*colors.length)],
  	checked: false,
  	position: {
  	  top: top,
  	  left: left,
  	  'z-index': posts.length+1
  	   }
    };
    // create new entry then link to subtasklist
    posts.$add(newPost).then(addTaskId);
    // promise function
    function addTaskId(ref) {
  	ref.update({ taskId: ref.key() });
    }
  }
  
  function _removeFromFirebase(key, taskId) {
    posts.$remove(key).then(removeSync);
    // promise to remove related subtasks && resync posts
    function removeSync(ref) {
		taskList.$remove(taskList.$indexFor(taskId)).then(function() {
			posts = $firebaseArray(ref.parent());
		});
    }
  }
}
