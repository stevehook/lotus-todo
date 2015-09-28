var React = require('react');

var TodoTask = React.createClass({
  render: function() {
  	return (
      <li key={'task-' + this.props.task.id} className={this.props.task.completed ? 'completed' : 'pending'}>
        <span className='glyphicon glyphicon-ok' onClick={this.handleComplete}></span>
        <span>{this.props.task.title}</span>
        <span className='glyphicon glyphicon-remove'></span>
      </li>
  	);
  },

  handleComplete: function() {
    if (this.props.onCompleteTask) {
      this.props.onCompleteTask(this.props.task.id);
    }
  }
});

module.exports = TodoTask;
