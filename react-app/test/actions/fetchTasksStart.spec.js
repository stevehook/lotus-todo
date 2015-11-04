const assert = require('assert');
const expect = require('chai').expect;

import * as actions from '../../js/actions/actionTypes';

describe('actions', () => {
  describe('fetchTasksStart', () => {
    it('create the correct action', () => {
      expect(actions.fetchTasksStart()).to.eql({
        type: actions.FETCH_TASKS_START
      });
    });
  });
});
