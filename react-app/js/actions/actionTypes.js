const TaskService = require('../services/TaskService');
const AuthService = require('../services/AuthService');

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

export function login(email, password) {
  return function (dispatch) {
    dispatch(loginStart());
    let authService = new AuthService();
    return authService.login(email, password)
      .then(res => dispatch(loginSuccess(res.body)))
      .catch(err => dispatch(loginFailure('Login Failed')));
  }
};

export function loginStart() {
  return { type: LOGIN_START };
};

export function loginSuccess(user) {
  return { type: LOGIN_SUCCESS, user };
};

export function loginFailure(error) {
  return { type: LOGIN_FAILURE, error };
};

export function fetchTasks() {
  return function (dispatch) {
    dispatch(fetchTasksStart());
    let taskService = new TaskService();
    return taskService.getOutstanding()
      .then(res => dispatch(fetchTasksSuccess(res.body)))
      .catch(err => dispatch(fetchTasksFailure('API Failed')));
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
