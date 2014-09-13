'use strict';

describe('Service: authenticator', function () {
  var authenticator;

  beforeEach(function() {
    module('todoApp');
    inject(function($injector) {
      authenticator = $injector.get('authenticator');
    });
  });

  it('is initially not logged in', function() {
    expect(authenticator.loggedIn()).toEqual(false);
  });

  it('can log in', function() {
    authenticator.login();
    expect(authenticator.loggedIn()).toEqual(true);
  });

});
