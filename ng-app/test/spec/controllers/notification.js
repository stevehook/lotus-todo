'use strict';

describe('Controller: NotificationCtrl', function () {

  var NotificationCtrl,
    rootScope,
    scope;

  // load the controller's module
  beforeEach(module('todoApp'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, NOTIFICATION_TYPES, AUTH_MESSAGES) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    NotificationCtrl = $controller('NotificationCtrl', { $scope: scope, $rootScope: rootScope, NOTIFICATION_TYPES: NOTIFICATION_TYPES, AUTH_MESSAGES: AUTH_MESSAGES });
  }));

  beforeEach(function() {
  });

  afterEach(function () {
  });

  describe('Controller: NotificationCtrl', function () {
    it('notification message is initially blank', function () {
      expect(scope.show).toEqual(false);
      expect(scope.text).toEqual('');
      expect(scope.type).toEqual('');
    });
  });
  describe('Controller: NotificationCtrl event handling', function () {
    it('sets a notification message when a known message is broadcast', function () {
      rootScope.$broadcast('auth', 'logout-success');
      expect(scope.show).toEqual(true);
      expect(scope.text).toEqual('Logout succeeded');
      expect(scope.type).toEqual('info');
    });
    it('ignores an unknown message when broadcast', function () {
      rootScope.$broadcast('auth', 'foo');
      expect(scope.show).toEqual(false);
      expect(scope.text).toEqual('');
      expect(scope.type).toEqual('');
    });
  });
  describe('Controller: NotificationCtrl#setNotification', function () {
    it('sets the text and type for a given notification message', function () {
      scope.setNotification('Something happened', 'warning');
      expect(scope.show).toEqual(true);
      expect(scope.text).toEqual('Something happened');
      expect(scope.type).toEqual('warning');
    });
  });
  describe('Controller: NotificationCtrl#setNotification', function () {
    it('sets the text and type for a given notification message', function () {
      scope.show = true;
      scope.text = 'An error occured';
      scope.type = 'danger';
      scope.resetNotification();
      expect(scope.show).toEqual(false);
      expect(scope.text).toEqual('');
      expect(scope.type).toEqual('');
    });
  });
});
