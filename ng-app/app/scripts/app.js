'use strict';

/**
 * @ngdoc overview
 * @name todoApp
 * @description
 * # todoApp
 *
 * Main module of the application.
 */
angular
  .module('todoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .run(function($http) {
    $http.defaults.headers.common.Accept = 'application/json';
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: { load: function(AuthenticationService) { return AuthenticationService.verifyLoggedIn(); } }
      })
      .when('/archive', {
        templateUrl: 'views/archive.html',
        controller: 'ArchiveCtrl',
        resolve: { load: function(AuthenticationService) { return AuthenticationService.verifyLoggedIn(); } }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        resolve: { load: function(AuthenticationService) { return AuthenticationService.verifyLoggedIn(); } }
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory('errorHttpInterceptor', function ($q, $location) {
    return {
      responseError: function responseError(rejection) {
        if (rejection.status === 401) {
          $location.path('/login');
          return $q.reject(rejection);
        } else {
          return $q.reject(rejection);
        }
      }
    };
  })
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('errorHttpInterceptor');
  }]);
