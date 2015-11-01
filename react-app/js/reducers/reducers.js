import { ADD_TODO, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/actionTypes'

const initialState = {
  loggedIn: false,
  user: null,
  tasks: [],
  newTask: { id: 0, title: '', completed: false }
}

function todoApp(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return Object.assign({}, state, {
        tasks: state.tasks.concat([{ id: 0, title: action.title, completed: false }])
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loggedIn: true,
        user: action.user
      })
    default:
      return state;
  }
}

module.exports = todoApp;
