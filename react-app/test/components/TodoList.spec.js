const expect = require('expect');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const { TodoList } = require('../../js/components/TodoList.react.js');
const TodoTask = require('../../js/components/TodoTask.react.js');
const TodoNewTask = require('../../js/components/TodoNewTask.react.js');
const TaskService = require('../../js/services/TaskService');

let props = {
  newTask: {},
  tasks: [
      { id: 123, title: 'Walk the dog' },
      { id: 456, title: 'Clean the kitchen' },
      { id: 789, title: 'Read a good book' },
    ]
};

function setup() {
  let renderer = TestUtils.createRenderer();
  renderer.render(<TodoList tasks={props.tasks}/>);
  let output = renderer.getRenderOutput();

  return {
    output,
    renderer
  };
}

describe('TodoList.react', () => {
  it('renders a TodoNewTask component', () => {
    const { output } = setup();
    expect(output.type).toEqual('div');
    let [ newTask, _ ] = output.props.children;
    expect(newTask.type).toEqual(TodoNewTask);
  });

  it('renders a TodoTask components for each task', () => {
    const { output } = setup();
    let [ _, div ] = output.props.children;
    let ul = div.props.children;
    expect(ul.props.children.length).toEqual(3);
    expect(ul.props.children[0].type).toEqual(TodoTask);
    expect(ul.props.children[1].type).toEqual(TodoTask);
    expect(ul.props.children[2].type).toEqual(TodoTask);
  });
});
