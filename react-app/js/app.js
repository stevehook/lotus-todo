require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { TodoApp } from './components/TodoApp.react';
import todoApp from './reducers/todoApp';

let store = createStore(todoApp, { loggedIn: false, user: null });

ReactDOM.render(<Provider store={store}><TodoApp /></Provider>, document.getElementById('todoapp'));
