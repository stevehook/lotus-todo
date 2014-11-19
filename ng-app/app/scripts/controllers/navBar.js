'use strict';

angular.module('todoApp')
  .controller('NavBarCtrl', function ($rootScope, $scope, $location, AUTH_EVENTS, AuthenticationService) {
    $scope.isLoggedIn = function () {
      return AuthenticationService.isLoggedIn();
    };
    $scope.routeIs = function (route) {
      return $location.path() === route;
    };
    $scope.logout = function () {
      AuthenticationService.logout().then(function () {
        $rootScope.$broadcast('auth', AUTH_EVENTS.logoutSuccess);
        $location.path('/login');
      }, function () {
        $rootScope.$broadcast('auth', AUTH_EVENTS.logoutFailed);
      });
    };
  });
