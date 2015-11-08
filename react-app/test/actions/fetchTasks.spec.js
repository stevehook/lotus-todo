const expect = require('chai').expect;
const request = require('superagent');
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as actions from '../../js/actions/actionTypes';
import nock from 'nock';

const middlewares = [thunk];

function mockStore(getState, expectedActions, done) {
  if (!Array.isArray(expectedActions)) {
    throw new Error('expectedActions should be an array of expected actions.');
  }
  if (typeof done !== 'undefined' && typeof done !== 'function') {
    throw new Error('done should either be undefined or function.');
  }

  function mockStoreWithoutMiddleware() {
    return {
      getState() {
        return typeof getState === 'function' ?  getState() : getState;
      },

      dispatch(action) {
        const expectedAction = expectedActions.shift();

        try {
          expect(action).to.eql(expectedAction);
          if (done && !expectedActions.length) {
            done();
          }
          return action;
        } catch (e) {
          done(e);
        }
      }
    }
  }

  const mockStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(mockStoreWithoutMiddleware);

  return mockStoreWithMiddleware();
}

describe('actions', () => {
  describe('fetchTasks', () => {
    afterEach(() => { nock.cleanAll(); });

    it('create the correct action', (done) => {
      let responseBody = [{ id: 123, title: 'Walk the dog' }];
      nock('http://localhost')
        .get('/api/tasks')
        .reply(200, responseBody, {'Content-Type': 'application/json'});

      const expectedActions = [
        { type: actions.FETCH_TASKS_START },
        { type: actions.FETCH_TASKS_SUCCESS, tasks: responseBody }
      ];
      const initialState = {
        data: {
          tasks: []
        },
        authentication: {
          loggedIn: false,
          user: null
        }
      };
      const store = mockStore(initialState, expectedActions, done);
      store.dispatch(actions.fetchTasks());
    });
  });
});
