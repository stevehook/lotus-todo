'use strict';

angular.module('todoApp')
  .controller('NavBarCtrl', function ($scope, AuthenticationService, $location) {
    $scope.isLoggedIn = function () {
      return AuthenticationService.isLoggedIn();
    };
    $scope.routeIs = function (route) {
      return $location.path() === route;
    };
  });
