'use strict';

angular.module('todoApp')
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success'
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
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $scope.currentUser = user;
        $location.path('/');
      }, function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    };
    $scope.logout = function () {
      AuthenticationService.logout().then(function () {
        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        $scope.currentUser = undefined;
      }, function () {
        $rootScope.$broadcast(AUTH_EVENTS.logoutFailed);
      });
    };
  });
