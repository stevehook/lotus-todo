// TODO: Drop the requirement for jquery - use superagent?
var $ = require('jquery');
var request = require('superagent');

class TaskService {
  getOutstanding() {
    // return $.get('/api/tasks', {}, null, 'json');
    return new Promise((resolve, reject) => {
      request
        .get('/api/tasks')
        .set('Accept', 'application/json')
        .end((err, res) => {
          err ? reject(err) : resolve(res);
        });
    });
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
