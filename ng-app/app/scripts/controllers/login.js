'use strict';

angular.module('todoApp')
  .constant('AUTH_EVENTS', {
    loginSuccess: 'login-success',
    loginFailed: 'login-failed',
    logoutSuccess: 'logout-success',
    logoutFailed: 'logout-failed'
  })
  .controller('LoginCtrl', function ($scope, $rootScope, $location, AUTH_EVENTS, AuthenticationService) {
    $scope.credentials = {
      email: ''
    };
    $scope.isLoggedIn = function () {
      return AuthenticationService.isLoggedIn();
    };
    $scope.login = function (credentials) {
      AuthenticationService.login({ credentials: credentials }).then(function (user) {
        $rootScope.$broadcast('auth', AUTH_EVENTS.loginSuccess);
        $scope.currentUser = user;
        $location.path('/');
      }, function () {
        $rootScope.$broadcast('auth', AUTH_EVENTS.loginFailed);
      });
    };
  });
