'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoApp
 */


angular.module('todoApp')
  .constant('TASK_EVENTS', {
    taskCompleteSuccess: 'complete-success',
    taskCompleteFailed: 'complete-failed',
    taskCreateSuccess: 'create-success',
    taskCreateFailed: 'create-failed',
    taskDeleteSuccess: 'delete-success',
    taskDeleteFailed: 'delete-failed'
  })
  .controller('MainCtrl', function($rootScope, $scope, $http, TASK_EVENTS) {
    $scope.tasks = [];

    $http.get('/api/tasks').success(function(data) {
      $scope.tasks = data;
      $scope.newTask = {};
    });

    $scope.completeTask = function(task) {
      if (!task.completed) {
        $http.post('/api/tasks/' + task.id + '/complete', task, { headers: { 'X-Http-Method-Override': 'PATCH' } }).
          success(function() {
            task.completed = true;
            $rootScope.$broadcast('task', TASK_EVENTS.taskCompleteSuccess);
          }).
          error(function() {
            $rootScope.$broadcast('task', TASK_EVENTS.taskCompleteFailed);
          });
      }
    };

    $scope.deleteTask = function(task) {
      $http.delete('/api/tasks/' + task.id, task, {}).
        success(function() {
          $scope.tasks.splice($scope.tasks.indexOf(task), 1);
          $rootScope.$broadcast('task', TASK_EVENTS.taskDeleteSuccess);
        }).
        error(function() {
          $rootScope.$broadcast('task', TASK_EVENTS.taskDeleteFailed);
        });
    };

    $scope.createTask = function() {
      if ($scope.isValid($scope.newTask)) {
        $http.post('/api/tasks', { task: $scope.newTask }, { headers: { 'X-Http-Method-Override': 'PATCH' } }).
          success(function(task) {
            $scope.tasks.push(task);
            $scope.newTask = {};
            $rootScope.$broadcast('task', TASK_EVENTS.taskCreateSuccess);
          }).
          error(function() {
            $rootScope.$broadcast('task', TASK_EVENTS.taskCreateFailed);
          });
      }
    };

    $scope.isValid = function(task) {
      return (task.title && task.title !== '');
    };
  });
