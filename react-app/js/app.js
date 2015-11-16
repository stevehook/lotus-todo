require('babel-polyfill');

const React = require('react');
const TodoApp = require('./components/TodoApp.react');

import { createStore } from 'redux';
import todoApp from 'reducers/todoApp';

const store = createStore(todoApp);

React.render(<TodoApp />, document.getElementById('todoapp'));
