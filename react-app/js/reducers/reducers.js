import { ADD_TODO } from '../actions/actionTypes'

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
        tasks: state.tasks.concat([{ id: 0, title: action.title, completed: false }]);
      })
    default:
      return state;
  }
}
