const expect = require('chai').expect;
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var TodoApp = require('../../js/components/TodoApp.react.js');
var TodoList = require('../../js/components/TodoList.react.js');
var LoginForm = require('../../js/components/LoginForm.react.js');
var AuthService = require('../../js/services/AuthService.js');

describe('TodoApp.react', () => {
  var promise = { then: () => { return promise; }, catch: () => { return promise; } };
  AuthService.prototype.checkLoggedIn = () => promise;

  var todoApp = TestUtils.renderIntoDocument(
    <TodoApp/>
  );

  it('renders a login box', () => {
    var loginForm = TestUtils.findRenderedComponentWithType(todoApp, LoginForm);
    expect(loginForm).toBeDefined();
  });

  it('does not render a list', () => {
    var lists = TestUtils.scryRenderedComponentsWithType(todoApp, TodoList);
    expect(lists.length).toEqual(0);
  });
});
