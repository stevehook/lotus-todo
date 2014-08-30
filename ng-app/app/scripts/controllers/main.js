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

    $http.get('/api/tasks').success(function(data) {
      $scope.tasks = data;
    });

    $scope.completeTask = function(task) {
      $http.post('/api/tasks/' + task.id + '/complete', task, { headers: { 'X-Http-Method-Override': 'PATCH' } }).
        success(function() {
          task.completed = true;
        }).
        error(function() {
          console.log('failed');
        });
    };
  });
