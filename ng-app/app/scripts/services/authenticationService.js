'use strict';

angular.module('todoApp')
  .service('AuthenticationService', function ($http) {
    this.login = function (credentials) {
      return $http
        .post('/api/sessions', credentials)
        .then(function (res) {
          return res.data;
        });
    };

    this.logout = function () {
      return $http
        .delete('/api/sessions')
        .then(function (res) {
          return res.data;
        });
    };
  });
