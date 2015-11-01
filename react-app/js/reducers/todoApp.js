import { ADD_TODO } from '../actions/actionTypes';
const authentication = require('./authentication');

const INITIAL_TASK_STATE = {
  tasks: [],
  newTask: { id: 0, title: '', completed: false }
};

const INITIAL_STATE = {
  authentication: authentication.INITIAL_STATE,
  data: INITIAL_TASK_STATE
};

function todos(state = INITIAL_TASK_STATE, action) {
  switch (action.type) {
    case ADD_TODO:
      return Object.assign({}, state, {
        tasks: state.tasks.concat([{ id: 0, title: action.title, completed: false }]),
      });
    default:
      return state;
  }
};

function todoApp(state = INITIAL_STATE, action) {
  return {
    data: todos(state.data, action),
    authentication: authentication(state.authentication, action)
  }
};

todoApp.INITIAL_STATE = INITIAL_STATE;

module.exports = todoApp;
