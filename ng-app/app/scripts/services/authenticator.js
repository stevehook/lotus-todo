'use strict';

angular.module('todoApp')
  .factory('authenticator', function () {
    var loggedIn = false;

    return {
      loggedIn: function() {
        return loggedIn;
      },
      login: function() {
        loggedIn = true;
      }
    };
  });

