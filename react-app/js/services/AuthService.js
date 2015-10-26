var request = require('superagent');
var ApiService = require('./ApiService');

class AuthService extends ApiService {
  login(email, password) {
    return this.promisify(
      request
        .post('/api/sessions')
        .send({ credentials: { email: email, password: password } })
        .set('Accept', 'application/json')
    );
  }

  logout() {
    // TODO: Call the API to delete the current session
  }

  checkLoggedIn() {
    return this.promisify(
      request
        .get('/api/sessions')
        .set('Accept', 'application/json')
    );
  }
};

module.exports = AuthService;
