const request = require('superagent');
const ApiService = require('./ApiService');

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
        .set({ 'X-Http-Method-Override': 'PATCH', 'Accept': 'application/json' })
    );
  }

  archive(taskId) {
    return this.promisify(
      request
        .post(`/api/tasks/${taskId}/archive`)
        .set({ 'X-Http-Method-Override': 'PATCH', 'Accept': 'application/json' })
    );
  }
};

module.exports = TaskService;
