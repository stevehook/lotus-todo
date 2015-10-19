var React = require('react');
var TodoTask = require('./TodoTask.react');
var TodoNewTask = require('./TodoNewTask.react');

var TodoList = React.createClass({
  getInitialState: function() {
    return {
      tasks: [],
      newTask: { id: 0, title: '', completed: false }
    };
  },

  componentDidMount: function() {
    this.setState({ tasks: [
      { id: 123, title: 'Walk the dog', completed: false },
      { id: 456, title: 'Cook dinner', completed: false },
      { id: 789, title: 'Go to the pub', completed: true }
    ]});
  }

  handleNewTaskInput: function(taskTitle) {
    var tasks = this.state.tasks;
    tasks.push({ id: 0, title: taskTitle, completed: false })
    this.setState({ tasks: tasks });
  },

  handleCompleteTask: function(taskId) {
    this.updateTaskState(taskId, (task) => {
      task.completed = true;
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
