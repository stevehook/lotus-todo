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

  describe('verifyLoggedIn', function() {
    var resolved;

    describe('when the user has NOT logged in previously', function() {
      beforeEach(inject(function(AuthenticationService) {
        var response = { loggedIn: false };
        $httpBackend.when('GET', '/api/sessions').respond(401, response);
        var promise = AuthenticationService.verifyLoggedIn();
        promise.then(function(value) { resolved = value; });
        $httpBackend.flush();
      }));
      it('the initial state is logged out', inject(function(AuthenticationService) {
        expect(resolved).toBeUndefined();
        expect(AuthenticationService.loggedIn).toEqual(false);
      }));
    });

    describe('when the user has logged in previously (but the AuthenticationService has been reset)', function() {
      beforeEach(inject(function(AuthenticationService) {
        var response = { loggedIn: true, user: { id: 123, name: 'Bob', email: 'bob@example.com' } };
        $httpBackend.when('GET', '/api/sessions').respond(200, response);
        var promise = AuthenticationService.verifyLoggedIn();
        promise.then(function(value) { resolved = value; });
        $httpBackend.flush();
      }));
      it('the initial state is logged in', inject(function(AuthenticationService) {
        expect(resolved).toBeDefined();
        expect(AuthenticationService.loggedIn).toEqual(true);
      }));
    });
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

