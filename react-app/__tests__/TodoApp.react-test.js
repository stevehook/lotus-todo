// __tests__/TodoApp.react-test.js
console.log('in the test');

jest.dontMock('../../components/TodoApp.react.js');
describe('TodoApp.react', function() {
  it('runs', function() {
    var React = require('react/addons');
    var TodpApp = require('../../components/TodoApp.react.js');
  });
});
