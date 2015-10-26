const React = require('react');
const ENTER_KEY = 13;

const TodoNewTask = React.createClass({
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

    let input = React.findDOMNode(this.refs.newField);
    let val = input.value.trim();

    if (val) {
      this.props.onNewTaskInput(val);
      input.value = '';
    }
  }
});

module.exports = TodoNewTask;
