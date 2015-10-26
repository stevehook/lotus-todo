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
    let taskService = new TaskService();
    taskService.getOutstanding().then((res) => {
      if (this.isMounted()) {
        this.setState({ tasks: res.body });
      }
    }).catch(() => {
      // TODO: Display a message
    });
  },

  handleNewTaskInput: function(taskTitle) {
    let taskService = new TaskService();
    taskService.create(taskTitle).then((res) => {
      let tasks = this.state.tasks;
      tasks.push(res.body);
      this.setState({ tasks: tasks });
    }).catch(() => {
      // TODO: Display a message
    });
  },

  handleCompleteTask: function(taskId) {
    let taskService = new TaskService();
    taskService.complete(taskId).then((res) => {
      this.updateTaskState(taskId, (task) => {
        task.completed = true;
      });
    }).catch(() => {
      // TODO: Display a message
    });
  },

  handleArchiveTask: function(taskId) {
    let taskService = new TaskService();
    taskService.archive(taskId).then((res) => {
      this.updateTaskState(taskId, (task) => {
        task.archived = true;
      });
    }).catch(() => {
      // TODO: Display a message
    });
  },

  updateTaskState: function(taskId, process) {
    let index = this.state.tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      let tasks = this.state.tasks;
      let task = tasks.splice(index, 1)[0];
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
  }
});

module.exports = TodoList;
