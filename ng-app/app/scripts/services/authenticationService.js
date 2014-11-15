'use strict';

angular.module('todoApp')
  .service('AuthenticationService', function ($http) {
    var self = this;
    this.loggedIn = false;
    this.login = function (credentials) {
      return $http
        .post('/api/sessions', credentials)
        .then(function (res) {
          self.loggedIn = true;
          return res.data;
        });
    };

    this.logout = function () {
      return $http
        .delete('/api/sessions')
        .then(function (res) {
          self.loggedIn = false;
          return res.data;
        });
    };

    this.isLoggedIn = function () {
      return self.loggedIn;
    };
  });
