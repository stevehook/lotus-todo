const React = require('react');

const TodoTask = React.createClass({
  render: function() {
  	return (
      <li key={'task-' + this.props.task.id} className={this.props.task.completed ? 'completed' : 'pending'}>
        <span className='glyphicon glyphicon-ok' onClick={this.handleComplete}></span>
        <span>{this.props.task.title}</span>
        <span className='glyphicon glyphicon-remove' onClick={this.handleArchive}></span>
      </li>
  	);
  },

  handleComplete: function() {
    if (this.props.onCompleteTask) {
      this.props.onCompleteTask(this.props.task.id);
    }
  },

  handleArchive: function() {
    if (this.props.onArchiveTask) {
      this.props.onArchiveTask(this.props.task.id);
    }
  }
});

module.exports = TodoTask;
