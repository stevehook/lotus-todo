const expect = require('chai').expect;
const request = require('superagent');
import * as actions from '../../js/actions/actionTypes';
import nock from 'nock';
import mockStore from '../mockStore';

describe('actions', () => {
  describe('completeTask', () => {
    afterEach(() => { nock.cleanAll(); });
    const initialState = {
      data: {
        tasks: [
          { id: 123, title: 'Cook dinner', completed: false },
          { id: 456, title: 'Feed the kids', completed: false },
          { id: 789, title: 'Feed the wife', completed: false }
        ]
      },
      authentication: {
        loggedIn: false,
        user: null
      }
    };

    describe('when /api/tasks succeeds', () => {
      let responseBody = { id: 123, title: 'Cook dinner', completed: true };

      beforeEach(() => {
        nock('http://localhost')
          .post('/api/tasks/123/complete')
          .reply(200, responseBody, {'Content-Type': 'application/json'});
      });

      it('it dispatches the correct actions', (done) => {
        const expectedActions = [
          { type: actions.COMPLETE_TASK_START },
          { type: actions.COMPLETE_TASK_SUCCESS, task: responseBody }
        ];
        const store = mockStore(initialState, expectedActions, done);
        store.dispatch(actions.completeTask(123));
      });
    });

    describe('when /api/tasks fails', () => {
      beforeEach(() => {
        nock('http://localhost')
          .post('/api/tasks/123/complete')
          .reply(400, {}, {'Content-Type': 'application/json'});
      });

      it('it dispatches the correct actions', (done) => {
        const expectedActions = [
          { type: actions.COMPLETE_TASK_START },
          { type: actions.COMPLETE_TASK_FAILURE, error: 'API Failed' }
        ];
        const store = mockStore(initialState, expectedActions, done);
        store.dispatch(actions.completeTask(123));
      });
    });
  });
});

