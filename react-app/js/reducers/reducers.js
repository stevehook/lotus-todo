import { ADD_TODO } from '../actions/actionTypes'

const initialState = {
  loggedIn: false,
  user: null,
  tasks: [],
  newTask: { id: 0, title: '', completed: false }
}

function todoApp(state = initialState, action) {
  // For now this is a no-op
  return state;
}
