'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoApp
 */


angular.module('todoApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.tasks = [];

    $http.get('/tasks').success(function(data) {
      $scope.tasks = data;
    });
  });
