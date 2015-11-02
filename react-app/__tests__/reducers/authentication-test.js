jest.dontMock('../../js/reducers/todoApp');
jest.dontMock('../../js/reducers/authentication');
jest.dontMock('../../js/reducers/todos');

const React = require('react');
const todoApp = require('../../js/reducers/todoApp')

describe('todoApp LOGIN_SUCCESS', () => {
  it('sets the user and login state', () => {
    let newState = todoApp(undefined, {
      type: 'LOGIN_SUCCESS',
      user: { id: 123, name: 'Bob' }
    });
    expect(newState).toEqual({
      authentication: {
        loggedIn: true,
        user: { id: 123, name: 'Bob' },
      },
      data: {
        tasks: [],
        newTask: { id: 0, title: '', completed: false }
      }
    });
  });
});

describe('todoApp LOGIN_FAILURE', () => {
  it('sets the user and login state', () => {
    let previousState = Object.assign({}, todoApp.INITIAL_STATE, {
      authentication: {
        loggedIn: true,
        user: { id: 456, name: 'Alice' }
      }
    });
    let newState = todoApp(previousState, {
      type: 'LOGIN_FAILURE',
      error: 'You are not getting in'
    });
    expect(newState).toEqual({
      authentication: {
        loggedIn: false,
        user: null,
      },
      data: {
        tasks: [],
        newTask: { id: 0, title: '', completed: false }
      }
    });
  });
});
