// TODO: Drop the requirement for jquery - use superagent?
var $ = require('jquery');

class AuthService {
  login(email, password) {
    // return {
    //   id: 123,
    //   name: 'Bob',
    //   email: email
    // };
    return $.post('/api/sessions',
                  { credentials: { email: email, password: password } },
                  null,
                  'json');
  }

  logout() {
    // TODO: Call the API to delete the current session
  }

  checkLoggedIn() {
    return $.get('/api/sessions');
  }
};

module.exports = AuthService;
