const expect = require('expect');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
import { TodoApp } from '../../js/components/TodoApp.react.js';
const TodoList = require('../../js/components/TodoList.react.js');
const LoginForm = require('../../js/components/LoginForm.react.js');
const AuthService = require('../../js/services/AuthService.js');

import { createStore } from 'redux';

function setup() {
  let props = { store: createStore((state) => state) };

  let renderer = TestUtils.createRenderer();
  renderer.render(<TodoApp {...props} />);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('TodoApp.react', () => {
  let resolveAuth, rejectAuth;

  beforeEach(() => {
    let promise = new Promise(function(resolve, reject) { resolveAuth = resolve; rejectAuth = reject; });
    AuthService.prototype.checkLoggedIn = () => promise;
  });

  describe('When NOT logged in', () => {
    it('renders a login box', () => {
      const { output } = setup();
      expect(output.props.children.type).toEqual(LoginForm);
    });
  });

  describe('When logged in', () => {
    // This spec doesn't work because the shallow renderer doesn't call componentDidMount
    xit('renders a list', () => {
      const { output } = setup();
      resolveAuth({ name: 'Bob', id: 345 });
      expect(output.props.children.type).toEqual(TodoList);
    });
  });
});
