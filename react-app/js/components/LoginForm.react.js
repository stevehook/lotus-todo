var React = require('react');
var AuthService = require('../services/AuthService');

var LoginForm = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <div class="form-container">
        <form onSubmit={this.handleSubmit}>
          <input type='text' className='form-control user-email' ref='loginEmail' placeholder='Enter your email address' autofocus/>
          <input type='pasword' className='form-control user-password' ref='loginPassword'/>
          <button type='submit' className='btn btn-default'>Login</button>
        </form>
      </div>
    );
  },

  handleSubmit: function(event) {
    event.preventDefault();

    var email = React.findDOMNode(this.refs.loginEmail).value.trim();
    var password = React.findDOMNode(this.refs.loginPassword).value.trim();

    var authService = new AuthService();
    var user = authService.login(email, password);
    if (user) {
      this.props.onAuthenticationSucceeded(user);
    } else {
      this.props.onAuthenticationFailed();
    }
  }
});

module.exports = LoginForm;
