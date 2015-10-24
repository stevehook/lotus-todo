var React = require('react');
var TodoList = require('./TodoList.react');
var LoginForm = require('./LoginForm.react');
var AuthService = require('../services/AuthService');

var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: false,
      user: null
    };
  },

  componentDidMount: function() {
    var authService = new AuthService();
    authService.checkLoggedIn().then((user) => {
      if (this.isMounted()) {
        this.setState({ loggedIn: true, user: user });
      }
    }).catch(() => {
      if (this.isMounted()) {
        this.setState({ loggedIn: false, user: null });
      }
    });
  },

  handleAuthenticationFailed: function() {
    this.setState({ loggedIn: false, user: null });
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
