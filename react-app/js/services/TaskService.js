// TODO: Drop the requirement for jquery - use superagent?
var $ = require('jquery');
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
    return $.post('/api/tasks', { task: { title: title } }, null, 'json');
  }

  complete(taskId) {
    return $.ajax({
      url: `/api/tasks/${taskId}/complete`,
      method: 'POST',
      headers: { 'X-Http-Method-Override': 'PATCH' },
      dataType: 'json'
    });
  }

  archive(taskId) {
    return $.ajax({
      url: `/api/tasks/${taskId}/archive`,
      method: 'POST',
      headers: { 'X-Http-Method-Override': 'PATCH' },
      dataType: 'json'
    });
  }
};

module.exports = TaskService;
