export const LOGIN_START = 'LOGIN_START
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

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

export function addTodo(title) {
  return { type: ADD_TODO, title };
};

export function completeTodo(index) {
  return { type: COMPLETE_TODO, index };
};

export function archiveTodo(index) {
  return { type: ARCHIVE_TODO, index };
};
