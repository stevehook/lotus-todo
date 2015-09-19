var React = require('react');
var ENTER_KEY = 13;

var TodoTask = React.createClass({
  render: function() {
  	return (
      <input type='text' value={this.props.task.title} onKeyDown={this.handleNewTodoKeyDown}></input>
  	);
  },

  handleNewTodoKeyDown: function (event) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var val = React.findDOMNode(this.refs.newField).value.trim();

    if (val) {
      console.log('New task: ', val);
    }
  }
});

module.exports = TodoTask;
