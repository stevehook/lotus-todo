const authentication = require('./authentication');
const todos = require('./todos');

const INITIAL_STATE = {
  authentication: authentication.INITIAL_STATE,
  data: todos.INITIAL_STATE
};

function todoApp(state = INITIAL_STATE, action) {
  return {
    data: todos(state.data, action),
    authentication: authentication(state.authentication, action)
  }
};

todoApp.INITIAL_STATE = INITIAL_STATE;

module.exports = todoApp;
