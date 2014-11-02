'use strict';

angular.module('todoApp')
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success'
  })
  .controller('LoginCtrl', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
    $scope.credentials = {
      email: ''
    };
    $scope.login = function (credentials) {
      AuthService.login(credentials).then(function (user) {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $scope.currentUser = user;
      }, function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    };
    $scope.logout = function () {
      AuthService.logout().then(function () {
        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        $scope.currentUser = undefined;
      }, function () {
        $rootScope.$broadcast(AUTH_EVENTS.logoutFailed);
      });
    };
  });
