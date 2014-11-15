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
        controller: 'MainCtrl'
      })
      .when('/archive', {
        templateUrl: 'views/archive.html',
        controller: 'ArchiveCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope, $location, AuthenticationService) {
    $rootScope.$on('$routeChangeStart', function(event, next) {
      if (!AuthenticationService.isLoggedIn()) {
        if (next.templateUrl === 'views/login.html') {
        } else {
          $location.path('/login');
        }
      }
    });
  })
  .factory('errorHttpInterceptor', ['$q', function ($q) {
    return {
      responseError: function responseError(rejection) {
        //TODO: Display an error message
        console.log('something bad happened');
        return $q.reject(rejection);
      }
    };
  }])
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('errorHttpInterceptor');
  }]);
