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
      logout: function() {}
    };
    authEvents = AUTH_EVENTS;

    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', { $scope: scope, $rootScope: rootScope, AUTH_EVENTS: authEvents, AuthService: authService });
  }));

  afterEach(function () {
    sandbox.restore();
  });

  it('attaches a credentials object to the scope', function () {
    expect(scope.credentials).toBeDefined();
    expect(scope.credentials.email).toEqual('');
  });

  describe('Controller: LoginCtrl#login', function() {
    describe('with valid credentials', function() {
      var credentials = { email: 'bob@example.com' };

      beforeEach(function() {
        sandbox.stub(authService, 'login', function() {
          var defer = q.defer();
          defer.resolve(user);
          return defer.promise;
        });
        sandbox.stub(rootScope, '$broadcast', function() {
        });
      });

      it('calls the AuthService#login method and passes credentials', function () {
        scope.login(credentials);
        expect(authService.login.calledWith(credentials)).toEqual(true);
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
          defer.resolve();
          return defer.promise;
        });
      });

      it('broadcasts the loginFailed event', function() {
      });
    });
  });

  describe('Controller: LoginCtrl#logout', function () {
    it('calls the AuthService#logout method', function () {
      sandbox.stub(authService, 'logout', function() {
        var defer = q.defer();
        defer.resolve();
        return defer.promise;
      });
      scope.logout();
      expect(authService.logout.calledWith()).toEqual(true);
    });
  });
});
