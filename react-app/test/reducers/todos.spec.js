const expect = require('chai').expect;
const todoApp = require('../../js/reducers/todoApp');

describe('todoApp UNKNOWN ACTION', () => {
  it('returns the initial state', () => {
    let newState = todoApp(undefined, {
      type: 'UNKNOWN'
    });
    expect(newState).to.eql(todoApp.INITIAL_STATE);
  });
});

describe('todoApp ADD_TASK_SUCCESS', () => {
  it('adds a new task', () => {
    let newState = todoApp(undefined, {
      type: 'ADD_TASK_SUCCESS',
      task: { id: 0, title: 'Walk the dog', completed: false }
    });
    expect(newState.data).to.eql({
      tasks: [ { id: 0, title: 'Walk the dog', completed: false } ],
      newTask: { id: 0, title: '', completed: false }
    });
  });

  const initialState = {
    data: {
      tasks: [ { id: 123, title: 'Some existing chore', completed: false } ],
      newTask: { id: 0, title: '', completed: false }
    },
    authentication: {
      loggedIn: true,
      user: { id: 123, name: 'Bob' }
    }
  };
  describe('todoApp ADD_TASK', () => {
    it('adding a task is asynchronous so does not add a task straight away', () => {
      let newState = todoApp(initialState, {
        type: 'ADD_TASK',
        title: 'Walk the dog'
      });
      expect(newState.data).to.eql(initialState.data);
    });
  });
  describe('todoApp ADD_TASK_FAILURE', () => {
    it('does not change state', () => {
      let newState = todoApp(initialState, {
        type: 'ADD_TASK_FAILURE',
        error: 'Server on fire'
      });
      expect(newState.data).to.eql(initialState.data);
    });
  });
  describe('todoApp ADD_TASK_START', () => {
    it('does not change state', () => {
      let newState = todoApp(initialState, {
        type: 'ADD_TASK_START'
      });
      expect(newState.data).to.eql(initialState.data);
    });
  });
});

describe('todos FETCH_TASKS_SUCCESS', () => {
  let tasks = [
    { id: 123, title: 'Walk the dog', completed: true },
    { id: 456, title: 'Cook dinner', completed: false },
    { id: 789, title: 'Eat dinner', completed: false }
  ];

  it('adds a new task', () => {
    let newState = todoApp(undefined, {
      type: 'FETCH_TASKS_SUCCESS',
      tasks: tasks
    });
    expect(newState.data).to.eql({
      tasks: tasks,
      newTask: { id: 0, title: '', completed: false }
    });
  });
});
