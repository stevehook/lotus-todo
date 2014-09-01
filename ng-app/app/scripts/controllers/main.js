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
      $scope.newTask = {};
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

    $scope.deleteTask = function(task) {
      $http.delete('/api/tasks/' + task.id, task, {}).
        success(function() {
          $scope.tasks.splice($scope.tasks.indexOf(task), 1);
        }).
        error(function() {
          console.log('failed');
        });
    };

    $scope.createTask = function() {
      if ($scope.isValid($scope.newTask)) {
        $http.post('/api/tasks', { task: $scope.newTask }, { headers: { 'X-Http-Method-Override': 'PATCH' } }).
          success(function(task) {
            $scope.tasks.push(task);
            $scope.newTask = {};
          }).
          error(function() {
            console.log('failed');
          });
      }
    };

    $scope.isValid = function(task) {
      return (task.title && task.title !== '');
    };
  });
