'use strict';

angular.module('todoApp')
  .constant('NOTIFICATION_TYPES', {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'danger'
  })
  .constant('MESSAGES', {
    loginSuccess: 'Login succeeded',
    loginFailed: 'Login failed',
    logoutSuccess: 'Logout succeeded',
    logoutFailed: 'Logout failed'
  })
  .controller('NotificationCtrl', function ($rootScope, $scope, NOTIFICATION_TYPES, MESSAGES, AUTH_EVENTS) {
    $scope.show = false;
    $scope.text = '';
    $scope.type = '';
    $rootScope.$on(AUTH_EVENTS.loginSuccess, function(){
      $scope.setNotification(MESSAGES.loginSuccess, NOTIFICATION_TYPES.success);
    });
    $rootScope.$on(AUTH_EVENTS.loginFailed, function(){
      $scope.setNotification(MESSAGES.loginFailed, NOTIFICATION_TYPES.error);
    });
    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function(){
      $scope.setNotification(MESSAGES.logoutSuccess, NOTIFICATION_TYPES.success);
    });
    $rootScope.$on(AUTH_EVENTS.logoutFailed, function(){
      $scope.setNotification(MESSAGES.logoutFailed, NOTIFICATION_TYPES.error);
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
