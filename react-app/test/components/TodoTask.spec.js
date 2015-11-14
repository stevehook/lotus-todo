const expect = require('chai').expect;
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var TodoTask = require('../../js/components/TodoTask.react.js');

function setup() {
  let props = {
    task: {
      id: 123,
      title: 'Walk the dog'
    },
    onCompleteTask: expect.createSpy(),
    onArchiveTask: expect.createSpy()
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<TodoTask {...props} />);
  let output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('TodoApp.react', () => {
  it('renders the correct markup', () => {
    const { output } = setup();
  });

  it('invokes callback when complete button is clicked', () => {
    const { output, props } = setup();
  });
});
