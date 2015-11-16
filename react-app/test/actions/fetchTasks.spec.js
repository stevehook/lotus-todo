const expect = require('chai').expect;
const request = require('superagent');
import * as actions from '../../js/actions/actionTypes';
import nock from 'nock';
import mockStore from '../mockStore';

describe('actions', () => {
  describe('fetchTasks', () => {
    afterEach(() => { nock.cleanAll(); });
    const initialState = {
      data: {
        tasks: []
      },
      authentication: {
        loggedIn: false,
        user: null
      }
    };

    describe('when /api/tasks succeeds', () => {
      let responseBody = [{ id: 123, title: 'Walk the dog' }];

      beforeEach(() => {
        nock('http://localhost')
          .get('/api/tasks')
          .reply(200, responseBody, {'Content-Type': 'application/json'});
      });

      it('it dispatches the correct actions', (done) => {
        const expectedActions = [
          { type: actions.FETCH_TASKS_START },
          { type: actions.FETCH_TASKS_SUCCESS, tasks: responseBody }
        ];
        const store = mockStore(initialState, expectedActions, done);
        store.dispatch(actions.fetchTasks());
      });
    });

    describe('when /api/tasks fails', () => {
      beforeEach(() => {
        nock('http://localhost')
          .get('/api/tasks')
          .reply(400, {}, {'Content-Type': 'application/json'});
      });

      it('it dispatches the correct actions', (done) => {
        const expectedActions = [
          { type: actions.FETCH_TASKS_START },
          { type: actions.FETCH_TASKS_FAILURE, error: 'API Failed' }
        ];
        const store = mockStore(initialState, expectedActions, done);
        store.dispatch(actions.fetchTasks());
      });
    });
  });
});
