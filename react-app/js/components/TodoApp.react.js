var React = require('react');
var TodoTask = require('./TodoTask.react');

var TodoApp = React.createClass({
  getInitialState: function() {
    return { tasks: [
      { id: 123, title: 'Walk the dog', completed: false },
      { id: 456, title: 'Cook dinner', completed: false },
      { id: 789, title: 'Go to the pub', completed: true }
    ] };
  },

  createTask: function(task) {
    return (
      <TodoTask task={task}/>
    );
  },

  render: function() {
  	return (
      <div><ul>{this.state.tasks.map(this.createTask)}</ul></div>
  	);
  },

});

module.exports = TodoApp;
