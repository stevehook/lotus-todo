require('babel-polyfill');

const React = require('react');
const TodoApp = require('./components/TodoApp.react');

React.render(<TodoApp />, document.getElementById('todoapp'));
