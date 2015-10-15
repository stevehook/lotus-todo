// TODO: Drop the requirement for jquery - use superagent?
var $ = require('jquery');

class AuthService {
  login(email, password) {
    // TODO: Call an API to attempt to log the user in and handle success/failure
    return {
      id: 123,
      name: 'Bob',
      email: email
    };
  }

  logout() {
    // TODO: Call the API to delete the current session
  }

  checkLoggedIn() {
    // TODO: Call the API to find out whether we already have a valid session
    return $.get('/api/sessions');
  }
};

module.exports = AuthService;
