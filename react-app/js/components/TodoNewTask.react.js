var React = require('react');
var ENTER_KEY = 13;

var TodoTask = React.createClass({
  render: function() {
    return (
      <input ref='newField' onKeyDown={this.handleNewTodoKeyDown}></input>
    );
  },

  handleNewTodoKeyDown: function (event) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var val = React.findDOMNode(this.refs.newField).value.trim();

    if (val) {
      // TODO: What goes here?
      // Do we manipulate state directly?
      // Or do we need to create a new model layer?
      // Or do we need to raise an event that gets handled by the parent?
      console.log('New task: ', val);

      this.props.onNewTaskInput(val);
    }
  }
});

module.exports = TodoTask;
