'use strict';

describe('Controller: NavBarCtrl', function () {

  var NavBarCtrl,
    rootScope,
    scope,
    authEvents,
    authService,
    sandbox,
    q;

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
    NavBarCtrl = $controller('NavBarCtrl', { $scope: scope, $rootScope: rootScope, AUTH_EVENTS: authEvents, AuthenticationService: authService });
  }));

  beforeEach(function() {
    sandbox.spy(rootScope, '$broadcast');
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('Controller: NavBarCtrl#logout', function () {
    beforeEach(function() {
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

    it('broadcasts the logout success event', function () {
      scope.logout();
      rootScope.$apply();
      expect(rootScope.$broadcast.calledWith('auth', 'logout-success')).toEqual(true);
    });

    it('navigates to the login route', inject(function ($location) {
      scope.logout();
      rootScope.$apply();
      expect($location.path()).toEqual('/login');
    }));
  });
});
