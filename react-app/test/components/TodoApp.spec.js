import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import { TodoApp } from '../../js/components/TodoApp.react.js';
import TodoList from '../../js/components/TodoList.react.js';
import LoginForm from '../../js/components/LoginForm.react.js';
import AuthService from '../../js/services/AuthService.js';

function setup() {
  let renderer = TestUtils.createRenderer();
  renderer.render(<TodoApp/>);
  let output = renderer.getRenderOutput();

  return {
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
