var React = require('react');
var TodoList = require('./TodoList.react');
var LoginForm = require('./LoginForm.react');

var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: false,
      user: null
    };
  },

  handleAuthenticationFailed: function() {
  },

  handleAuthenticationSucceeded: function(user) {
    this.setState({ loggedIn: true, user: user });
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
          <LoginForm onAuthenticationSucceeded={this.handleAuthenticationSucceeded}
                     onAuthenticationFailed={this.handleAuthenticationFailed}/>
        </div>
      );
    }
  }
});

module.exports = TodoApp;
