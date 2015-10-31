// __tests__/TodoApp.react-test.js

jest.dontMock('../js/components/TodoList.react.js');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var TodoList = require('../js/components/TodoList.react.js');
var TodoTask = require('../js/components/TodoTask.react.js');
var TodoNewTask = require('../js/components/TodoNewTask.react.js');
var TaskService = require('../js/services/TaskService');

describe('TodoList.react', () => {
  var handleDone;
  var promise = { then: (callback) => { handleDone = callback; return promise; }, catch: () => { return promise; } };
  TaskService.prototype.getOutstanding.mockReturnValue(promise);

  var todoList = TestUtils.renderIntoDocument(
    <TodoList/>
  );

  it('renders a TodoTask component for each task', () => {
    var tasks = TestUtils.scryRenderedComponentsWithType(todoList, TodoTask);
    expect(tasks.length).toEqual(0);
    handleDone({
      body: [
        { id: 123, title: 'Walk the dog' },
        { id: 456, title: 'Clean the kitchen' },
        { id: 789, title: 'Read a good book' },
      ]
    });
    tasks = TestUtils.scryRenderedComponentsWithType(todoList, TodoTask);
    expect(tasks.length).toEqual(3);
  });

  it('renders a TodoNewTask component for the new task', () => {
    var newTask = TestUtils.findRenderedComponentWithType(todoList, TodoNewTask);
    expect(newTask).toBeDefined();
  });
});
