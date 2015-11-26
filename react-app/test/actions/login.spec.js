const expect = require('chai').expect;
const request = require('superagent');
import * as actions from '../../js/actions/actionTypes';
import nock from 'nock';
const mockStore = require('../mockStore');

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

    describe('when POST /api/sessions fails', () => {
      beforeEach(() => {
        nock('http://localhost')
          .post('/api/sessions')
          .reply(400, {}, {'Content-Type': 'application/json'});
      });

      it('it dispatches the correct actions', (done) => {
        const expectedActions = [
          { type: actions.LOGIN_START },
          { type: actions.LOGIN_FAILURE, error: 'Login Failed' }
        ];
        const store = mockStore(initialState, expectedActions, done);
        store.dispatch(actions.login());
      });
    });
  });
});
