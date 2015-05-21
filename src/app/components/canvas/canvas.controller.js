'use strict';

angular.module('todoPostApp')
  .controller('CanvasCtrl', function ($scope) {
    $scope.posts = [
    	{ id: 1, 
    	  title: 'Hello post',
    	  description: 'That is very hello',
    	  subtasks: ['be a man', 'be a girl', 'be a dog']
    	},
    	{ id: 2, 
    	  title: 'Hello post 2',
    	  description: 'It is over',
    	  subtasks: ['go home', 'go school', 'be a dog']
    	},
    	{ id: 3, 
    	  title: 'Hello post 2',
    	  description: 'It is over',
    	  subtasks: ['go home', 'go school', 'be a dog']
    	},
    	{ id: 4, 
    	  title: 'Hello post 2',
    	  description: 'It is over',
    	  subtasks: ['go home', 'go school', 'be a dog']
    	}
    ];
  });
