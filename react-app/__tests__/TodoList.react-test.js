// __tests__/TodoApp.react-test.js

jest.dontMock('../js/components/TodoList.react.js');
var React = require('react/addons');
var TodoList = require('../js/components/TodoList.react.js');
var TodoTask = require('../js/components/TodoTask.react.js');
var TodoNewTask = require('../js/components/TodoNewTask.react.js');
var TestUtils = React.addons.TestUtils;

describe('TodoList.react', () => {
  var todoList = TestUtils.renderIntoDocument(
    <TodoList/>
  );

  it('renders a TodoTask component for each task', () => {
    var tasks = TestUtils.scryRenderedComponentsWithType(todoList, TodoTask);
    expect(tasks.length).toEqual(3);
  });

  it('renders a TodoNewTask component for the new task', () => {
    var newTask = TestUtils.findRenderedComponentWithType(todoList, TodoNewTask);
    expect(newTask).toBeDefined();
  });
});
