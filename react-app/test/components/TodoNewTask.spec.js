const expect = require('expect');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const TodoNewTask = require('../../js/components/TodoNewTask.react.js');

describe('TodoNewTask.react', () => {
  let newTask, input;

  beforeEach(() => {
    let handleNewTaskInput = (task) => {
      newTask = task;
    };

    let todoNewTask = TestUtils.renderIntoDocument(
      <TodoNewTask onNewTaskInput={handleNewTaskInput}/>
    );
    input = TestUtils.findRenderedDOMComponentWithTag(todoNewTask, 'input');
  });

  it('renders an input element', () => {
    expect(input).toExist();
  });

  it('calls onNewTaskInput handler when user presses enter key', () => {
    input.value = 'Walk the dog';
    TestUtils.Simulate.keyDown(input, { keyCode: 13 });
    expect(newTask).toExist();
    expect(newTask).toEqual('Walk the dog');
  });
});
