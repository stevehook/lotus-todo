var React = require('react');
var TodoList = require('./TodoList.react');

var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: false,
      name: null
    };
  },

  render: function() {
  	return (
      <div>
        <TodoList/>
      </div>
  	);
  }

});

module.exports = TodoApp;
