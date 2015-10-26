const request = require('superagent');

class ApiService {
  promisify(req) {
    return new Promise((resolve, reject) => {
      req.end((err, res) => {
        err ? reject(err) : resolve(res);
      });
    });
  }
};

module.exports = ApiService;
