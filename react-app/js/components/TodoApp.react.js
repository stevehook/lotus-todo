var React = require('react');
var TodoTask = require('./TodoTask.react');
var TodoNewTask = require('./TodoNewTask.react');

var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      tasks: [
        { id: 123, title: 'Walk the dog', completed: false },
        { id: 456, title: 'Cook dinner', completed: false },
        { id: 789, title: 'Go to the pub', completed: true }
      ],
      newTask: { id: 0, title: '', completed: false }
    };
  },

  handleNewTaskInput: function(taskTitle) {
    var tasks = this.state.tasks;
    tasks.push({ id: 0, title: taskTitle, completed: false })
    this.setState({ tasks: tasks });
  },

  handleCompleteTask: function(taskId) {
    var index = this.state.tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      var tasks = this.state.tasks;
      var task = tasks.splice(index, 1)[0];
      task.completed = true;
      tasks.splice(index, 0, task);
      this.setState({ tasks: tasks });
    }
  },

  render: function() {
  	return (
      <div>
        <TodoNewTask task={this.state.newTask} onNewTaskInput={this.handleNewTaskInput} />
        <div><ul className='task-list'>{this.state.tasks.map((task) => {
          return (
            <TodoTask task={task} onCompleteTask={this.handleCompleteTask}/>
          );
        })}</ul>
        </div>
      </div>
  	);
  },

});

module.exports = TodoApp;
