// TODO: Drop the requirement for jquery - use superagent?
var $ = require('jquery');

class TaskService {
  getOutstanding() {
    return $.get('/api/tasks', {}, null, 'json');
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
