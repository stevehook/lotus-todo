// TODO: Drop the requirement for jquery - use superagent?
var $ = require('jquery');

class TaskService {
  getOutstanding() {
    return $.get('/api/tasks', {}, null, 'json');
  }
};

module.exports = TaskService;
