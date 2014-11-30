'use strict';

angular.module('todoApp')
  .constant('AUTH_MESSAGES', {
    'login-success': { text: 'Login succeeded', type: 'info' },
    'login-failed': { text: 'Login failed', type: 'danger' },
    'logout-success': { text: 'Logout succeeded', type: 'info' },
    'logout-failed': { text: 'Logout failed', type: 'danger' }
  })
  .constant('TASK_MESSAGES', {
    'create-success': { text: 'New task created', type: 'info' },
    'create-failed': { text: 'Could not create new task', type: 'danger' },
    'complete-success': { text: 'Task completed', type: 'info' },
    'complete-failed': { text: 'Could not complete task', type: 'danger' },
    'delete-success': { text: 'Task deleted', type: 'info' },
    'delete-failed': { text: 'Could not delete task', type: 'danger' }
  })
  .controller('NotificationCtrl', function ($rootScope, $scope, AUTH_MESSAGES, TASK_MESSAGES) {
    $scope.show = false;
    $scope.text = '';
    $scope.type = '';
    $rootScope.$on('auth', function(_, eventType){
      var message = AUTH_MESSAGES[eventType];
      if (message) { $scope.setNotification(message.text, message.type); }
    });
    $rootScope.$on('task', function(_, eventType){
      var message = TASK_MESSAGES[eventType];
      if (message) { $scope.setNotification(message.text, message.type); }
    });
    $scope.setNotification = function(text, type) {
      $scope.text = text;
      $scope.type = type;
      $scope.show = true;
    };
    $scope.resetNotification = function() {
      $scope.show = false;
      $scope.text = '';
      $scope.type = '';
    };
    $scope.showNotification = function () {
      return $scope.show;
    };
    $scope.notificationType = function () {
      return $scope.type;
    };
    $scope.notificationText = function () {
      return $scope.text;
    };
  });
