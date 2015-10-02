var React = require('react');

var LoginForm = React.createClass({
  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <div class="form-container">
        <form onSubmit={this.handleSubmit}>
          <input type='text' class='form-control user-email' placeholder='Enter your email address' autofocus/>
          <button type='submit' class='btn btn-default'>Login</button>
        </form>
      </div>
    );
  },

  handleSubmit: function() {
    //TODO: 
  }

});

module.exports = LoginForm;
