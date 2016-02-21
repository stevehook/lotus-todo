import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, CHECK_LOGGED_IN_START } from '../actions/actionTypes';

const INITIAL_STATE = {
  loggedIn: false,
  user: null,
};

function authentication(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_START:
    case CHECK_LOGGED_IN_START:
      // TODO: Set some kind of visual for logging in
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
