'use strict';

angular.module('todoApp')
  .service('AuthenticationService', function ($http, $q) {
    var self = this;
    this.loggedIn = false;
    this.isLoggedIn = function () {
      return this.loggedIn;
    };

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

    this.verifyLoggedIn = function () {
      var deferred = $q.defer();
      var self = this;
      if (this.loggedIn) {
        // If we already know that the user is logged in then we can resolve the promise immediately
        deferred.resolve(true);
      } else {
        // If we don't know that the user is logged in then we must contact the server to find out
        $http({ url: '/api/sessions', method: 'GET' })
        .then(function(response) {
          self.loggedIn = response.data.loggedIn;
          if (self.loggedIn) {
            deferred.resolve(true);
          } else {
            deferred.reject();
          }
        });
      }
      return deferred.promise;
    };
  });
