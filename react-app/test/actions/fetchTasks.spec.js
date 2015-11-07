import expect from 'chai';
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
        return typeof getState === 'function' ?
          getState() :
          getState;
      },

      dispatch(action) {
        const expectedAction = expectedActions.shift();

        try {
          expect(action).toEqual(expectedAction);
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

    it('create the correct action', () => {
      nock('http://lotus-todo.lvh.me:9292/')
        .get('/api/tasks')
        .reply(200, { todos: ['do something'] });

      const expectedActions = [
        { type: types.FETCH_TODOS_REQUEST },
        { type: types.FETCH_TODOS_SUCCESS, body: { todos: ['do something']  } }
      ];
      const store = mockStore({ todos: [] }, expectedActions, done);
      store.dispatch(actions.fetchTasks());
    });
  });
});
