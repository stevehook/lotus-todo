'use strict';


angular.module('todoApp')
  .controller('ArchiveCtrl', function ($scope, $http) {
    $scope.tasks = [];

    $http.get('/api/tasks/archive').success(function(data) {
      $scope.tasks = data;
    });
  });
