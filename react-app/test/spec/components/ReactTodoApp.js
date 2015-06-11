'use strict';

describe('ReactTodoApp', function () {
  var React = require('react/addons');
  var ReactTodoApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    ReactTodoApp = require('components/ReactTodoApp.js');
    component = React.createElement(ReactTodoApp);
  });

  it('should create a new instance of ReactTodoApp', function () {
    expect(component).toBeDefined();
  });
});
