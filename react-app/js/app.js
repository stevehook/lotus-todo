require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import TodoApp from './components/TodoApp.react';
import todoApp from './reducers/todoApp';

import thunkMiddleware from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
let store = createStoreWithMiddleware(todoApp, { loggedIn: false, user: null });

// TODO: Do I really need to pass the store as prop to TodoApp as well?
ReactDOM.render(<Provider store={store}><TodoApp store={store}/></Provider>, document.getElementById('todoapp'));
