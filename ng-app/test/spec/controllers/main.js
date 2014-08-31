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

  it('attaches a list of tasks to the scope', function () {
    expect(scope.tasks.length).toBe(3);
  });

  it('attaches a new task to the scope', function () {
    expect(scope.newTask).toBeDefined();
    expect(scope.newTask).toEqual({});
  });

  describe('Controller: MainCtrl#createTask', function () {

    var newTask = { id: 321, title: 'Feed the fishes'};

    it('calls the create API', function () {
      $httpBackend.expect('POST', '/api/tasks').respond(200, newTask);
      scope.createTask({ title: 'Feed the fishes', completedBy: '2014-09-01' });
      $httpBackend.flush();
    });

    it('clears the new task', function () {
      $httpBackend.when('POST', '/api/tasks').respond(200, newTask);
      scope.createTask({ title: 'Feed the fishes', completedBy: '2014-09-01' });
      $httpBackend.flush();
      expect(scope.newTask).toEqual({});
    });

    it('adds the new task to the task list', function () {
      $httpBackend.when('POST', '/api/tasks').respond(200, newTask);
      scope.createTask({ title: 'Feed the fishes', completedBy: '2014-09-01' });
      $httpBackend.flush();
      expect(scope.tasks.length).toBe(4);
    });
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
