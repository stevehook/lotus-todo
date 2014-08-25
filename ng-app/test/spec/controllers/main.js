'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('todoApp'));

  var MainCtrl,
    scope,
    $httpBackend;
  var tasks = [
      { title: 'Walk the dog' },
      { title: 'Cook dinner' },
      { title: 'Go to the pub' }
    ];

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {

    // Stub $http to return some tasks
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', '/tasks').respond(200, tasks);
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', { $scope: scope });
    $httpBackend.flush();
  }));

  it('should attach a list of tasks to the scope', function () {
    expect(scope.tasks.length).toBe(3);
  });
});
