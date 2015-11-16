import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/actionTypes'

const INITIAL_STATE = {
  loggedIn: false,
  user: null,
};

function authentication(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_START:
      return state;
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loggedIn: true,
        user: action.user
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        loggedIn: false,
        user: null
      });
    default:
      return state;
  }
};

authentication.INITIAL_STATE = INITIAL_STATE;

module.exports = authentication;
