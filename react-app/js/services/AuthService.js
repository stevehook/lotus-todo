// TODO: Drop the requirement for jquery - use superagent?
var $ = require('jquery');
var request = require('superagent');

class AuthService {
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

  promisify(req) {
    return new Promise((resolve, reject) => {
      req.end((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  }
};

module.exports = AuthService;
