// __tests__/TodoNewTask.react-test.js

jest.dontMock('../js/components/TodoNewTask.react.js');
var React = require('react/addons');
var TodoNewTask = require('../js/components/TodoNewTask.react.js');
var TestUtils = React.addons.TestUtils;

describe('TodoList.react', () => {
  var newTask;
  var handleNewTaskInput = function(task) {
    newTask = task;
  };

  var todoNewTask = TestUtils.renderIntoDocument(
    <TodoNewTask onNewTaskInput={handleNewTaskInput}/>
  );

  it('renders an input element', () => {
    var input = TestUtils.findRenderedDOMComponentWithTag(todoNewTask, 'input');
    expect(input).toBeDefined();
  });

  it('calls onNewTaskInput handler when user presses enter key', () => {
    var input = TestUtils.findRenderedDOMComponentWithTag(todoNewTask, 'input').getDOMNode();
    input.value = 'Walk the dog';
    TestUtils.Simulate.keyDown(input, { keyCode: 13 });
    expect(newTask).toBeDefined();
    expect(newTask).toEqual('Walk the dog');
  });
});
