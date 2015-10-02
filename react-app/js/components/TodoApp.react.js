var React = require('react');
var TodoList = require('./TodoList.react');
var LoginForm = require('./LoginForm.react');

var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: false,
      name: null
    };
  },

  render: function() {
    if (this.state.loggedIn) {
      return (
        <div>
          <TodoList/>
        </div>
      );
    } else {
      return (
        <div>
          <LoginForm/>
        </div>
      );
    }
  }

});

module.exports = TodoApp;
