const expect = require('chai').expect;
import * as actions from '../../js/actions/actionTypes';
import nock from 'nock';
import mockStore from '../mockStore';

describe('actions', () => {
  describe('archiveTask', () => {
    afterEach(() => { nock.cleanAll(); });
    const initialState = {
      data: {
        tasks: [
          { id: 123, title: 'Cook dinner', archived: false },
          { id: 456, title: 'Feed the kids', archived: false },
          { id: 789, title: 'Feed the wife', archived: false }
        ]
      },
      authentication: {
        loggedIn: false,
        user: null
      }
    };

    describe('when /api/tasks/:id/archive succeeds', () => {
      let responseBody = { id: 123, title: 'Cook dinner', archived: true };

      beforeEach(() => {
        nock('http://localhost')
          .post('/api/tasks/123/archive')
          .reply(200, responseBody, {'Content-Type': 'application/json'});
      });

      it('it dispatches the correct actions', (done) => {
        const expectedActions = [
          { type: actions.ARCHIVE_TASK_START },
          { type: actions.ARCHIVE_TASK_SUCCESS, task: responseBody }
        ];
        const store = mockStore(initialState, expectedActions, done);
        store.dispatch(actions.archiveTask(123));
      });
    });

    describe('when /api/tasks/:id/archive fails', () => {
      beforeEach(() => {
        nock('http://localhost')
          .post('/api/tasks/123/archive')
          .reply(400, {}, {'Content-Type': 'application/json'});
      });

      it('it dispatches the correct actions', (done) => {
        const expectedActions = [
          { type: actions.ARCHIVE_TASK_START },
          { type: actions.ARCHIVE_TASK_FAILURE, error: 'API Failed' }
        ];
        const store = mockStore(initialState, expectedActions, done);
        store.dispatch(actions.archiveTask(123));
      });
    });
  });
});

