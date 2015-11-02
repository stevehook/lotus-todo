import { ADD_TODO, FETCH_TASKS_START, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE } from '../actions/actionTypes';

const INITIAL_STATE = {
  tasks: [],
  newTask: { id: 0, title: '', completed: false }
};

function todos(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_TODO:
      return Object.assign({}, state, {
        tasks: state.tasks.concat([{ id: 0, title: action.title, completed: false }]),
      });
    case FETCH_TASKS_START:
      // TODO: Set UI status?
      return state;
    case FETCH_TASKS_SUCCESS:
      return Object.assign({}, state, {
        tasks: action.response.body
      });
    case FETCH_TASKS_FAILURE:
      // TODO: Set UI Error message
      return state;
    default:
      return state;
  }
};

todos.INITIAL_STATE = INITIAL_STATE;

module.exports = todos;
