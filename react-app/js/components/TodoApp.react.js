const React = require('react');
const TodoList = require('./TodoList.react');
const LoginForm = require('./LoginForm.react');
const AuthService = require('../services/AuthService');
import { connect } from 'react-redux';

export const TodoApp = React.createClass({
  componentDidMount: function() {
    // TODO: Dispatch the initial check logged in call to the server
    dispatch();
    // let authService = new AuthService();
    // authService.checkLoggedIn().then((user) => {
    //   if (this.isMounted()) {
    //     this.setState({ loggedIn: true, user: user });
    //   }
    // }).catch(() => {
    //   if (this.isMounted()) {
    //     this.setState({ loggedIn: false, user: null });
    //   }
    // });
  },

  // handleAuthenticationFailed: function() {
  //   this.setState({ loggedIn: false, user: null });
  // },

  // handleAuthenticationSucceeded: function(user) {
  //   this.setState({ loggedIn: true, user: user });
  // },

  render: function() {
    if (this.props.loggedIn) {
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

// Select state to inject given global state - just take it all for now
function select(state) {
  return state;
}

export default connect(select)(TodoApp);
