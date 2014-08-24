'use strict';

/**
 * @ngdoc function
 * @name todoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoApp
 */
angular.module('todoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.tasks = [
      { title: 'Walk the dog' },
      { title: 'Cook dinner' },
      { title: 'Go to the pub' }
    ];
  });
