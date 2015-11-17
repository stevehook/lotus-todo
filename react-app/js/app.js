require('babel-polyfill');

const React = require('react');
const TodoApp = require('./components/TodoApp.react');

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todoApp from './reducers/todoApp';

const store = createStore(todoApp, { loggedIn: false, user: null });

React.render(<Provider store={store}><TodoApp /></Provider>, document.getElementById('todoapp'));
