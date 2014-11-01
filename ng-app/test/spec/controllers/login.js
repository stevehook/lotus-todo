'use strict';

describe('Controller: LoginCtrl', function () {

  var LoginCtrl,
    scope,
    authEvents,
    authService,
    sandbox,
    q;
  var user = { id: 123, name: 'Bob Roberts', email: 'bob@example.com' };

  // load the controller's module
  beforeEach(module('todoApp'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $q) {
    sandbox = sinon.sandbox.create();
    q = $q;
    authService = { login: function() {} };
    authEvents = {};

    scope = $rootScope.$new();
    LoginCtrl = $controller('LoginCtrl', { $scope: scope, $rootScope: $rootScope, AUTH_EVENTS: {}, AuthService: authService });
  }));

   afterEach(function () {
     sandbox.restore();
   });

  it('attaches a credentials object to the scope', function () {
    expect(scope.credentials).toBeDefined();
    expect(scope.credentials.email).toEqual('');
  });

  describe('Controller: LoginCtrl#login', function () {
    it('calls the AuthService#login method and passes credentials', function () {
      sandbox.stub(authService, 'login', function() {
        var defer = q.defer();
        defer.resolve(user);
        return defer.promise;
      });
      var credentials = { email: 'bob@example.com' };
      scope.login(credentials);
      expect(authService.login.calledWith(credentials)).toEqual(true);
    });
  });
});
