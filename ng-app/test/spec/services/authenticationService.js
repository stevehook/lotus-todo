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

  it('login returns the matching user details', inject(function(AuthenticationService) {
    var data;
    $httpBackend.when('POST', '/api/sessions').respond(200, user);
    AuthenticationService.login({ email: 'bob@example.com' })
      .then(function(res) { data = res; });
    $httpBackend.flush();
    expect(data).toEqual(user);
  }));

  it('logout returns the matching user details', inject(function(AuthenticationService) {
    var data;
    $httpBackend.when('DELETE', '/api/sessions').respond(200, {});
    AuthenticationService.logout()
      .then(function(res) { data = res; });
    $httpBackend.flush();
    expect(data).toEqual({});
  }));
});

