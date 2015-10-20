var React = require('react');
var TodoTask = require('./TodoTask.react');
var TodoNewTask = require('./TodoNewTask.react');
var TaskService = require('../services/TaskService');

var TodoList = React.createClass({
  getInitialState: function() {
    return {
      tasks: [],
      newTask: { id: 0, title: '', completed: false }
    };
  },

  componentDidMount: function() {
    var taskService = new TaskService();
    taskService.getOutstanding().done((data) => {
      if (this.isMounted()) {
        this.setState({ tasks: data });
      }
    }).fail(() => {
      // TODO: Display a message
    });
  },

  handleNewTaskInput: function(taskTitle) {
    var taskService = new TaskService();
    taskService.create(taskTitle).done((newTask) => {
      var tasks = this.state.tasks;
      tasks.push(newTask);
      this.setState({ tasks: tasks });
    }).fail(() => {
      // TODO: Display a message
    });
  },

  handleCompleteTask: function(taskId) {
    var taskService = new TaskService();
    taskService.complete(taskId).done((updatedTask) => {
      this.updateTaskState(taskId, (task) => {
        task.completed = true;
      });
    }).fail(() => {
      // TODO: Display a message
    });
  },

  handleArchiveTask: function(taskId) {
    this.updateTaskState(taskId, (task) => {
      task.archived = true;
    });
  },

  updateTaskState: function(taskId, process) {
    var index = this.state.tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      var tasks = this.state.tasks;
      var task = tasks.splice(index, 1)[0];
      process(task)
      tasks.splice(index, 0, task);
      this.setState({ tasks: tasks });
    }
  },

  unarchivedTasks: function() {
    return this.state.tasks.filter((task) => !task.archived);
  },

  render: function() {
  	return (
      <div>
        <TodoNewTask task={this.state.newTask} onNewTaskInput={this.handleNewTaskInput} />
        <div><ul className='task-list'>{this.unarchivedTasks().map((task) => {
          return (
            <TodoTask task={task} onCompleteTask={this.handleCompleteTask} onArchiveTask={this.handleArchiveTask}/>
          );
        })}</ul>
        </div>
      </div>
  	);
  },

});

module.exports = TodoList;
