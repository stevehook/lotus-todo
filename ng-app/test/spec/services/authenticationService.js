'use strict';

describe('Service: AuthenticationService', function () {

  var $httpBackend,
    user;

  beforeEach(module('todoApp'));

  beforeEach(inject(function ($controller, $rootScope, $injector) {
    user = { id: 234, name: 'Bob', email: 'bob@example.com' };

    // Stub $http to return some tasks
    $httpBackend = $injector.get('$httpBackend');
  }));

  describe('isLoggedOut', function () {
    it('the initial state is logged out', inject(function(AuthenticationService) {
      expect(AuthenticationService.isLoggedIn()).toEqual(false);
    }));
  });

  describe('login', function () {
    var data;

    beforeEach(inject(function(AuthenticationService) {
      $httpBackend.when('POST', '/api/sessions').respond(200, user);
      AuthenticationService.loggedIn = false;
      AuthenticationService.login({ email: 'bob@example.com' })
        .then(function(res) { data = res; });
      $httpBackend.flush();
    }));

    it('returns the matching user details', function() {
      expect(data).toEqual(user);
    });

    it('sets the state to logged in', inject(function(AuthenticationService) {
      expect(AuthenticationService.isLoggedIn()).toEqual(true);
    }));
  });

  describe('logout', function () {
    var data;

    beforeEach(inject(function(AuthenticationService) {
      $httpBackend.when('DELETE', '/api/sessions').respond(200, {});
      AuthenticationService.loggedIn = true;
      AuthenticationService.logout()
        .then(function(res) { data = res; });
      $httpBackend.flush();
    }));

    it('returns nothing', function() {
      expect(data).toEqual({});
    });

    it('sets the state to logged out', inject(function(AuthenticationService) {
      expect(AuthenticationService.isLoggedIn()).toEqual(false);
    }));
  });
});

