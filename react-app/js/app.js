require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import { TodoApp } from './components/TodoApp.react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todoApp from './reducers/todoApp';

const store = createStore(todoApp, { loggedIn: false, user: null });

ReactDOM.render(<Provider store={store}><TodoApp /></Provider>, document.getElementById('todoapp'));
