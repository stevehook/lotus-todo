// __tests__/TodoApp.react-test.js
jest.dontMock('../../js/reducers/reducers.js');

var React = require('react');
var TestUtils = require('react-addons-test-utils');
var todoApp = require('../../js/reducers/reducers');

describe('todoApp UNKNOWN ACTION', () => {
  it('returns the initial state', () => {
    let newState = todoApp(undefined, {
      type: 'UNKNOWN'
    });
    expect(newState).toEqual({
      loggedIn: false,
      user: null,
      tasks: [],
      newTask: { id: 0, title: '', completed: false }
    });
  });
});

describe('todoApp ADD_TODO', () => {
  it('adds a new task', () => {
    let newState = todoApp(undefined, {
      type: 'ADD_TODO',
      title: 'Walk the dog'
    });
    expect(newState).toEqual({
      loggedIn: false,
      user: null,
      tasks: [ { id: 0, title: 'Walk the dog', completed: false } ],
      newTask: { id: 0, title: '', completed: false }
    });
  });
});

describe('todoApp LOGIN_SUCCESS', () => {
  it('sets the user and login state', () => {
    let newState = todoApp(undefined, {
      type: 'LOGIN_SUCCESS',
      user: { id: 123, name: 'Bob' }
    });
    expect(newState).toEqual({
      loggedIn: true,
      user: { id: 123, name: 'Bob' },
      tasks: [],
      newTask: { id: 0, title: '', completed: false }
    });
  });
});
