var React = require('react');

var TodoTask = React.createClass({
  render: function() {
  	return (
      <li key={'task-' + this.props.task.id} className={this.props.task.completed ? 'completed' : 'pending'}>
        <span className='glyphicon glyphicon-ok'></span>
        <span>{this.props.task.title}</span>
        <span className='glyphicon glyphicon-remove'></span>
      </li>
  	);
  },
});

module.exports = TodoTask;
