'use strict';

describe('Controller: LoginCtrl', function () {

  var LoginCtrl,
    rootScope,
    scope,
    authEvents,
    authService,
    sandbox,
    q;
  var user = { id: 123, name: 'Bob Roberts', email: 'bob@example.com' };

  // load the controller's module
  beforeEach(module('todoApp'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q, AUTH_EVENTS) {
    sandbox = sinon.sandbox.create();
    rootScope = $rootScope;
    q = $q;
    authService = {
      login: function() {},
      logout: function() {},
      isLoggedIn: function() {}
    };
    authEvents = AUTH_EVENTS;

    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', { $scope: scope, $rootScope: rootScope, AUTH_EVENTS: authEvents, AuthenticationService: authService });
  }));

  beforeEach(function() {
    sandbox.spy(rootScope, '$broadcast');
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('attaches a credentials object to the scope', function () {
    expect(scope.credentials).toBeDefined();
    expect(scope.credentials.email).toEqual('');
  });

  describe('Controller: LoginCtrl#login', function() {
    var credentials = { email: 'bob@example.com' };

    describe('with valid credentials', function() {
      beforeEach(function() {
        sandbox.stub(authService, 'login', function() {
          var defer = q.defer();
          defer.resolve(user);
          return defer.promise;
        });
      });

      it('calls the AuthenticationService#login method and passes credentials', function () {
        scope.login(credentials);
        expect(authService.login.calledWith({ credentials: credentials })).toEqual(true);
      });

      it('sets the current user', function() {
        scope.login(credentials);
        rootScope.$apply();
        expect(scope.currentUser).toBeDefined();
      });

      it('broadcasts the loginSuccess event', function() {
        scope.login(credentials);
        rootScope.$apply();
        expect(rootScope.$broadcast.calledWith('auth-login-success')).toEqual(true);
      });
    });

    describe('with invalid credentials', function() {
      beforeEach(function() {
        sandbox.stub(authService, 'login', function() {
          var defer = q.defer();
          defer.reject();
          return defer.promise;
        });
      });

      it('does not set the current user', function() {
        scope.login(credentials);
        rootScope.$apply();
        expect(scope.currentUser).not.toBeDefined();
      });

      it('broadcasts the loginFailed event', function() {
        scope.login(credentials);
        rootScope.$apply();
        expect(rootScope.$broadcast.calledWith('auth-login-failed')).toEqual(true);
      });
    });
  });

  describe('Controller: LoginCtrl#logout', function () {
    beforeEach(function() {
      scope.currentUser = { id: 123, name: 'Bob', email: 'bob@example.com' };
      sandbox.stub(authService, 'logout', function() {
        var defer = q.defer();
        defer.resolve();
        return defer.promise;
      });
    });

    it('calls the AuthenticationService#logout method', function () {
      scope.logout();
      rootScope.$apply();
      expect(authService.logout.calledWith()).toEqual(true);
    });

    it('resets the current user', function () {
      expect(scope.currentUser).toBeDefined();
      scope.logout();
      rootScope.$apply();
      expect(scope.currentUser).not.toBeDefined();
    });

    it('broadcasts the logout success event', function () {
      scope.logout();
      rootScope.$apply();
      expect(rootScope.$broadcast.calledWith('auth-logout-success')).toEqual(true);
    });
  });
});
