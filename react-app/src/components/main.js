'use strict';

var ReactTodoApp = require('./ReactTodoApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={ReactTodoApp}>
    <Route name="/" handler={ReactTodoApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
