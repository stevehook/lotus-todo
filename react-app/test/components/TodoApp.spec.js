const expect = require('chai').expect;
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const TodoApp = require('../../js/components/TodoApp.react.js');
const TodoList = require('../../js/components/TodoList.react.js');
const LoginForm = require('../../js/components/LoginForm.react.js');
const AuthService = require('../../js/services/AuthService.js');


// describe('TodoApp.react', () => {
//   var promise = { then: () => { return promise; }, catch: () => { return promise; } };
//   AuthService.prototype.checkLoggedIn = () => promise;

//   var todoApp = TestUtils.renderIntoDocument(
//     <TodoApp/>
//   );

//   it('renders a login box', () => {
//     var loginForm = TestUtils.findRenderedComponentWithType(todoApp, LoginForm);
//     expect(loginForm).toBeDefined();
//   });

//   it('does not render a list', () => {
//     var lists = TestUtils.scryRenderedComponentsWithType(todoApp, TodoList);
//     expect(lists.length).toEqual(0);
//   });
// });
