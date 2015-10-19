// TODO: Drop the requirement for jquery - use superagent?
var $ = require('jquery');

class TaskService {
  getOutstanding() {
    return $.get('/api/tasks', {}, null, 'json');
  }

  create(title) {
    return $.post('/api/tasks', { task: { title: title } }, null, 'json');
  }
};

module.exports = TaskService;
