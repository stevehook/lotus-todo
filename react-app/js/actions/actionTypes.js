const TaskService = require('../services/TaskService');
const AuthService = require('../services/AuthService');

export const CHECK_LOGGED_IN_START = 'CHECK_LOGGED_IN_START';
export const CHECK_LOGGED_IN_SUCCESS = 'CHECK_LOGGED_IN_SUCCESS';
export const CHECK_LOGGED_IN_FAILURE = 'CHECK_LOGGED_IN_FAILURE';

export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const FETCH_TASKS_START = 'FETCH_TASKS_START';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

export const LOGOUT = 'LOGOUT';

export const ADD_TODO = 'ADD_TODO';
export const ADD_TODO_START = 'ADD_TODO_START';
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS';
export const ADD_TODO_FAILURE = 'ADD_TODO_FAILURE';

export const COMPLETE_TODO = 'COMPLETE_TODO';
export const COMPLETE_TODO_START = 'COMPLETE_TODO_START';
export const COMPLETE_TODO_SUCCESS = 'COMPLETE_TODO_SUCCESS';
export const COMPLETE_TODO_FAILURE = 'COMPLETE_TODO_FAILURE';

export const ARCHIVE_TODO = 'ARCHIVE_TODO';
export const ARCHIVE_TODO_START = 'ARCHIVE_TODO_START';
export const ARCHIVE_TODO_SUCCESS = 'ARCHIVE_TODO_SUCCESS';
export const ARCHIVE_TODO_FAILURE = 'ARCHIVE_TODO_FAILURE';

export function checkLoggedIn() {
  return function (dispatch) {
    dispatch(checkLoggedInStart());
    let authService = new AuthService();
    return authService.checkLoggedIn()
      .then(res => dispatch(loginSuccess(res.body)))
      .catch(err => dispatch(loginFailure('Login Failed')));
  }
};

export function checkLoggedInStart() {
  return { type: CHECK_LOGGED_IN_START };
};

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
  return function (dispatch) {
    dispatch(addTodoStart());
    let taskService = new TaskService();
    return taskService.create(title)
      .then(res => dispatch(addTodoSuccess(res.body)))
      .catch(err => dispatch(addTodoFailure('API Failed')));
  }
};

export function addTodoStart() {
  return { type: ADD_TODO_START };
};
export function addTodoSuccess(task) {
  return { type: ADD_TODO_SUCCESS, task };
};
export function addTodoFailure(error) {
  return { type: ADD_TODO_FAILURE, error };
};

export function completeTodo(title) {
  return function (dispatch) {
    dispatch(completeTodoStart());
    let taskService = new TaskService();
    return taskService.create(title)
      .then(res => dispatch(completeTodoSuccess(res.body)))
      .catch(err => dispatch(completeTodoFailure('API Failed')));
  }
};

export function completeTodoStart() {
  return { type: COMPLETE_TODO_START };
};
export function completeTodoSuccess(task) {
  return { type: COMPLETE_TODO_SUCCESS, task };
};
export function completeTodoFailure(error) {
  return { type: COMPLETE_TODO_FAILURE, error };
};


export function archiveTodo(title) {
  return function (dispatch) {
    dispatch(archiveTodoStart());
    let taskService = new TaskService();
    return taskService.create(title)
      .then(res => dispatch(archiveTodoSuccess(res.body)))
      .catch(err => dispatch(archiveTodoFailure('API Failed')));
  }
};

export function archiveTodoStart() {
  return { type: ARCHIVE_TODO_START };
};
export function archiveTodoSuccess(task) {
  return { type: ARCHIVE_TODO_SUCCESS, task };
};
export function archiveTodoFailure(error) {
  return { type: ARCHIVE_TODO_FAILURE, error };
};
