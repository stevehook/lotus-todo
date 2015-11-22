const expect = require('expect');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const TodoList = require('../../js/components/TodoList.react.js');
const TodoTask = require('../../js/components/TodoTask.react.js');
const TodoNewTask = require('../../js/components/TodoNewTask.react.js');
const TaskService = require('../../js/services/TaskService');

describe('TodoList.react', () => {
  let todoList;
  // let handleDone;
  // let originalGetOutstanding;
  // let promise = { then: (callback) => { handleDone = callback; return promise; }, catch: () => { return promise; } };

  let initialState = {
    newTask: {},
    tasks: [
        { id: 123, title: 'Walk the dog' },
        { id: 456, title: 'Clean the kitchen' },
        { id: 789, title: 'Read a good book' },
      ]
  };

  beforeEach(() => {
    // originalGetOutstanding = TaskService.prototype.getOutstanding;
    // expect.spyOn(TaskService.prototype, 'getOutstanding').andReturn(promise);
    todoList = TestUtils.renderIntoDocument(<TodoList data={initialState}/>);
  });
  // afterEach(() => {
  //   expect.restoreSpies();
  // });

  it('renders a TodoTask component for each task', () => {
    // let tasks = TestUtils.scryRenderedComponentsWithType(todoList, TodoTask);
    // expect(tasks.length).toEqual(0);
    // handleDone({
    //   body: [
    //     { id: 123, title: 'Walk the dog' },
    //     { id: 456, title: 'Clean the kitchen' },
    //     { id: 789, title: 'Read a good book' },
    //   ]
    // });
    let tasks = TestUtils.scryRenderedComponentsWithType(todoList, TodoTask);
    expect(tasks.length).toEqual(3);
  });

  it('renders a TodoNewTask component for the new task', () => {
    let newTask = TestUtils.findRenderedComponentWithType(todoList, TodoNewTask);
    expect(newTask).toExist();
  });
});
