'use strict';

describe('Controller: ArchiveCtrl', function () {

  var ArchiveCtrl,
    scope,
    $httpBackend,
    tasks;

  // load the controller's module
  beforeEach(module('todoApp'));

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    tasks = [
        { id: 123, title: 'Walk the dog', completed: true, archivedAt: '2014-01-24' },
        { id: 456, title: 'Cook dinner', completed: true, archivedAt: '2014-02-06' },
        { id: 789, title: 'Go to the pub', completed: true, archivedAt: '2014-03-15' }
      ];

    // Stub $http to return some tasks
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', '/api/tasks/archive').respond(200, tasks);
    scope = $rootScope.$new();
    ArchiveCtrl = $controller('ArchiveCtrl', { $scope: scope });
    $httpBackend.flush();
  }));

  it('attaches a list of tasks to the scope', function () {
    expect(scope.tasks.length).toBe(3);
  });
});
