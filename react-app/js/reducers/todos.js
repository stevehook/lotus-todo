import { ADD_TASK, ADD_TASK_START, ADD_TASK_SUCCESS, ADD_TASK_FAILURE, FETCH_TASKS_START, FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE } from '../actions/actionTypes';

const INITIAL_STATE = {
  tasks: [],
  newTask: { id: 0, title: '', completed: false }
};

function todos(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_TASK_SUCCESS:
      return Object.assign({}, state, {
        tasks: state.tasks.concat([action.task]),
      });

    case FETCH_TASKS_START:
      // TASK: Set UI status?
      return state;
    case FETCH_TASKS_SUCCESS:
      return Object.assign({}, state, {
        tasks: action.tasks
      });
    case FETCH_TASKS_FAILURE:
      // TASK: Set UI Error message
      return state;
    default:
      return state;
  }
};

todos.INITIAL_STATE = INITIAL_STATE;

module.exports = todos;
