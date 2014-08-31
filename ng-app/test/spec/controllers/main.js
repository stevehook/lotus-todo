'use strict';

describe('Controller: MainCtrl', function () {

  var MainCtrl,
    scope,
    $httpBackend;
  var tasks = [
      { id: 123, title: 'Walk the dog', completed: false },
      { id: 456, title: 'Cook dinner', completed: false },
      { id: 789, title: 'Go to the pub', completed: true }
    ];

  // load the controller's module
  beforeEach(module('todoApp'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {

    // Stub $http to return some tasks
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', '/api/tasks').respond(200, tasks);
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', { $scope: scope });
    $httpBackend.flush();
  }));

  it('should attach a list of tasks to the scope', function () {
    expect(scope.tasks.length).toBe(3);
  });

  describe('Controller: MainCtrl#completeTask', function () {

    it('calls the complete API', function () {
      $httpBackend.expect('POST', '/api/tasks/123/complete' ).respond(200, tasks);
      scope.completeTask(tasks[0]);
      $httpBackend.flush();
    });

    it('resets the completed flag', function () {
      $httpBackend.when('POST', '/api/tasks/123/complete' ).respond(200, tasks);
      scope.completeTask(tasks[0]);
      $httpBackend.flush();
      expect(tasks[0].completed).toBe(true);
    });
  });
});
