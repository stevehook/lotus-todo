import { ADD_TODO, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/actionTypes'

const INITIAL_AUTH_STATE = {
  loggedIn: false,
  user: null,
};

const INITIAL_STATE = {
  authentication: INITIAL_AUTH_STATE,
  tasks: [],
  newTask: { id: 0, title: '', completed: false }
};

function authentication(state = INITIAL_AUTH_STATE, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loggedIn: true,
        user: action.user
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        loggedIn: false,
        user: null
      });
    default:
      return state;
  }
};

function todoApp(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_TODO:
      return Object.assign({}, state, {
        tasks: state.tasks.concat([{ id: 0, title: action.title, completed: false }])
      });
    // TODO: Refactor the authentication actions into a separate reducer function
    case LOGIN_SUCCESS:
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        authentication: authentication(state.authentication, action)
      });
    default:
      return state;
  }
};

todoApp.INITIAL_STATE = INITIAL_STATE;

module.exports = todoApp;
