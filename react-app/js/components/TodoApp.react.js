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

  render: function() {
  	return (
      <div>
        <TodoNewTask task={this.state.newTask} onNewTaskInput={this.handleNewTaskInput} />
        <div><ul className='task-list'>{this.state.tasks.map(function(task) {
          return (
            <TodoTask task={task}/>
          );
        })}</ul>
        </div>
      </div>
  	);
  },

});

module.exports = TodoApp;
