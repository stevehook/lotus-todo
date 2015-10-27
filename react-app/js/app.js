const React = require('react');
const TodoApp = require('./components/TodoApp.react');
require('../css/app.css');

React.render(<TodoApp />, document.getElementById('todoapp'));
