import React from 'react';
import TodoList from './TodoList.react';
import LoginForm from './LoginForm.react';
import AuthService from '../services/AuthService';
import { connect } from 'react-redux';
import { checkLoggedIn, login } from '../actions/actionTypes';

export const TodoApp = React.createClass({
  componentDidMount: function() {
    const { dispatch } = this.props;
    dispatch(checkLoggedIn());
  },

  handleLogin: function(email, password) {
    const { dispatch } = this.props;
    dispatch(login(email, password));
  },

  render: function() {
    if (this.props.authentication && this.props.authentication.loggedIn) {
      return (
        <div>
          <TodoList/>
        </div>
      );
    } else {
      return (
        <div>
          <LoginForm onLogin={this.handleLogin}/>
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
