export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const FETCH_TASKS_START = 'FETCH_TASKS_START';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

export const LOGOUT = 'LOGOUT';

export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const ARCHIVE_TODO = 'ARCHIVE_TODO';


export function loginStart() {
  return { type: LOGIN_START };
};

export function loginSuccess(user) {
  return { type: LOGIN_SUCCESS, user };
};

export function loginFailure(error) {
  return { type: LOGIN_FAILURE, error };
};

// Async action creator
export function fetchTasks() {
  return function (dispatch) {
    dispatch(fetchTasksStart());
    return fetch('/api/tasks', {
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => response.json())
      .then(json => dispatch(fetchTasksSuccess(json)))
      .catch(response => dispatch(fetchTasksFailure(response)));
  }
};

export function fetchTasksStart() {
  return { type: FETCH_TASKS_START };
};

export function fetchTasksSuccess(tasks) {
  return { type: FETCH_TASKS_SUCCESS, tasks };
};

export function fetchTasksFailure(error) {
  return { type: FETCH_TASKS_FAILURE, error };
};


export function addTodo(title) {
  return { type: ADD_TODO, title };
};

export function completeTodo(index) {
  return { type: COMPLETE_TODO, index };
};

export function archiveTodo(index) {
  return { type: ARCHIVE_TODO, index };
};
