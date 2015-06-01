'use strict';

/**
 * Following style-guide from:
 * https://github.com/johnpapa/angular-styleguide#startup-logic
 */
angular.module('todoPostApp', [
  'ngAnimate',
  'ngCookies',
  'ngTouch',
  'ngSanitize',
  'ngResource',
  'ngRoute',
  'firebase'
])
  .config(configure)
  .constant('FBURL', 'https://whatever.firebaseio-demo.com/');
// constant so only need to change URL in one place

configure.$inject = ['$routeProvider'];

function configure($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/main/main.html'
    })
    .otherwise({
      redirectTo: '/'
    })
}
