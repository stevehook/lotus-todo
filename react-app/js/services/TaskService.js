var request = require('superagent');
var ApiService = require('ApiService');

class TaskService extends ApiService {
  getOutstanding() {
    return this.promisify(
      request
        .get('/api/tasks')
        .set('Accept', 'application/json')
    );
  }

  create(title) {
    return this.promisify(
      request
        .post('/api/tasks')
        .send({ task: { title: title } })
        .set('Accept', 'application/json')
    );
  }

  complete(taskId) {
    return this.promisify(
      request
        .post(`/api/tasks/${taskId}/complete`)
        .headers({ 'X-Http-Method-Override': 'PATCH' })
        .set('Accept', 'application/json')
    );
  }

  archive(taskId) {
    return this.promisify(
      request
        .post(`/api/tasks/${taskId}/archive`)
        .headers({ 'X-Http-Method-Override': 'PATCH' })
        .set('Accept', 'application/json')
    );
  }
};

module.exports = TaskService;
