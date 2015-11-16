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
  describe('login', () => {
    afterEach(() => { nock.cleanAll(); });
    const initialState = {
      authentication: {
        loggedIn: false,
        user: null
      }
    };

    describe('when POST /api/sessions succeeds', () => {
      let responseBody = { user: { id: 123, name: 'Bob' } };

      beforeEach(() => {
        nock('http://localhost')
          .post('/api/sessions')
          .reply(200, responseBody, {'Content-Type': 'application/json'});
      });

      it('it dispatches the correct actions', (done) => {
        const expectedActions = [
          { type: actions.LOGIN_START },
          { type: actions.LOGIN_SUCCESS, user: responseBody }
        ];
        const store = mockStore(initialState, expectedActions, done);
        store.dispatch(actions.login());
      });
    });

    // describe('when /api/tasks fails', () => {
    //   beforeEach(() => {
    //     nock('http://localhost')
    //       .get('/api/tasks')
    //       .reply(400, {}, {'Content-Type': 'application/json'});
    //   });

    //   it('it dispatches the correct actions', (done) => {
    //     const expectedActions = [
    //       { type: actions.FETCH_TASKS_START },
    //       { type: actions.FETCH_TASKS_FAILURE, error: 'API Failed' }
    //     ];
    //     const store = mockStore(initialState, expectedActions, done);
    //     store.dispatch(actions.fetchTasks());
    //   });
    // });
  });
});
