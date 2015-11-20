import React from 'react';
import TodoList from './TodoList.react';
import LoginForm from './LoginForm.react';
import AuthService from '../services/AuthService';
import { connect } from 'react-redux';
import { checkLoggedIn } from '../actions/actionTypes';

export const TodoApp = React.createClass({
  componentDidMount: function() {
    const { dispatch } = this.props;

    // Dispatch the initial check logged in call to the server
    dispatch(checkLoggedIn());

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
