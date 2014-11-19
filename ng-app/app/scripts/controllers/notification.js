'use strict';

angular.module('todoApp')
  .constant('NOTIFICATION_TYPES', {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'danger'
  })
  .constant('AUTH_MESSAGES', {
    'login-success': { text: 'Login succeeded', type: 'info' },
    'login-failed': { text: 'Login failed', type: 'danger' },
    'logout-success': { text: 'Logout succeeded', type: 'info' },
    'logout-failed': { text: 'Logout failed', type: 'danger' }
  })
  .controller('NotificationCtrl', function ($rootScope, $scope, NOTIFICATION_TYPES, AUTH_MESSAGES) {
    $scope.show = false;
    $scope.text = '';
    $scope.type = '';
    $rootScope.$on('auth', function(_, eventType){
      var message = AUTH_MESSAGES[eventType];
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
