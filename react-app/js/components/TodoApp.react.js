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

  render: function() {
  	return (
      <div>
        <TodoNewTask task={newTask}/>
        <div><ul>{this.state.tasks.map(function(task) {
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
