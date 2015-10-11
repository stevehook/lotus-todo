var React = require('react');

var LoginForm = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <div class="form-container">
        <form onSubmit={this.handleSubmit}>
          <input type='text' className='form-control user-email' placeholder='Enter your email address' autofocus/>
          <button type='submit' className='btn btn-default'>Login</button>
        </form>
      </div>
    );
  },

  handleSubmit: function() {
    // TODO: Call authentication service to handle the authentication
  }
});

module.exports = LoginForm;
