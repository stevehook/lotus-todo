var React = require('react');
var ENTER_KEY = 13;

var TodoTask = React.createClass({
  render: function() {
    return (
      <div id='new-task' className='task new-task'>
        <input className='form-control task-title' placeholder='What needs to be done?' autofocus ref='newField' onKeyDown={this.handleNewTodoKeyDown}></input>
      </div>
    );
  },

  handleNewTodoKeyDown: function (event) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    var input = React.findDOMNode(this.refs.newField);
    var val = input.value.trim();

    if (val) {
      this.props.onNewTaskInput(val);
      input.value = '';
    }
  }
});

module.exports = TodoTask;
