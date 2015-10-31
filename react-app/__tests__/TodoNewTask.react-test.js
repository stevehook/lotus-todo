// __tests__/TodoNewTask.react-test.js

jest.dontMock('../js/components/TodoNewTask.react.js');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var TodoNewTask = require('../js/components/TodoNewTask.react.js');

describe('TodoNewTask.react', () => {
  var newTask;
  var handleNewTaskInput = function(task) {
    newTask = task;
  };

  var todoNewTask = TestUtils.renderIntoDocument(
    <TodoNewTask onNewTaskInput={handleNewTaskInput}/>
  );
  var input = TestUtils.findRenderedDOMComponentWithTag(todoNewTask, 'input');

  it('renders an input element', () => {
    expect(input).toBeDefined();
  });

  it('calls onNewTaskInput handler when user presses enter key', () => {
    input.getDOMNode().value = 'Walk the dog';
    TestUtils.Simulate.keyDown(input, { keyCode: 13 });
    expect(newTask).toBeDefined();
    expect(newTask).toEqual('Walk the dog');
  });
});
