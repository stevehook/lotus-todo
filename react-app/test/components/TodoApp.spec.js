const expect = require('expect');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const TodoApp = require('../../js/components/TodoApp.react.js');
const TodoList = require('../../js/components/TodoList.react.js');
const LoginForm = require('../../js/components/LoginForm.react.js');
const AuthService = require('../../js/services/AuthService.js');

function setup() {
  let props = {
  };

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
  let promise;

  beforeEach(() => {
    promise = { then: () => { return promise; }, catch: () => { return promise; } };
    AuthService.prototype.checkLoggedIn = () => promise;
  });

  describe('When NOT logged in', () => {
    it('renders a login box', () => {
      const { output } = setup();
      expect(output.props.children.type).toEqual(LoginForm);
    });
  });

  describe('When logged in', () => {
    it('renders a list', () => {
      const { output } = setup();
      promise.then();
      expect(output.props.children.type).toEqual(TodoList);
    });
  });
});
