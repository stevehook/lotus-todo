const expect = require('expect');
const React = require('react');
const TestUtils = require('react-addons-test-utils');
const TodoTask = require('../../js/components/TodoTask.react.js');

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
    expect(output.type).toBe('li');

    let [okIcon, title, removeIcon] = output.props.children;

    expect(okIcon.type).toBe('span');

    expect(title.type).toBe('span');
    expect(title.props.children).toBe('Walk the dog');

    expect(removeIcon.type).toBe('span');
  });

  it('invokes callback when complete button is clicked', () => {
    const { output, props } = setup();
  });
});
