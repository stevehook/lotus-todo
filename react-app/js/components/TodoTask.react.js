var React = require('react');

var TodoTask = React.createClass({
  render: function() {
  	return (
      <li key={'task-' + this.props.task.id}>{this.props.task.title}</li>
  	);
  },
});

module.exports = TodoTask;
