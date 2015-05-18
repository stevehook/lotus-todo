require 'spec_helper'

feature 'Session API' do
  let(:user) { UserRepository.persist(User.new(name: 'Bob Roberts', email: 'bob@example.com')) }

  before do
    header 'Accept', 'application/json'
  end

  after do
    UserRepository.clear
  end

  describe 'POST /api/sessions' do
    it 'returns 401 and does not create a new session when invalid credentials are given' do
      post '/api/sessions', { credentials: { email: 'eric@example.com' } }.to_json, { 'CONTENT_TYPE' => 'application/json' }
      expect(last_response).not_to be_ok
    end

    it 'returns 200 and creates a new session when valid credentials are given' do
      post '/api/sessions', { credentials: { email: 'bob@example.com' } }.to_json, { 'CONTENT_TYPE' => 'application/json' }
      expect(last_response).to be_ok
    end
  end

  describe 'DELETE /api/sessions' do
    it 'logs the user out' do
      delete '/api/sessions', {}.to_json, { 'CONTENT_TYPE' => 'application/json' }
      expect(last_response).to be_ok
      expect(last_request.env['rack.session'][:user_id]).to be_nil
    end
  end

  describe 'GET /api/sessions' do
    let(:rack_env) { { 'rack.session' => session, 'CONTENT_TYPE' => 'application/json' } }

    context 'when the user is logged in' do
      let(:session) { { user_id: user.id } }

      it 'gets the status, user id and name for the session' do
        get '/api/sessions', {}.to_json, rack_env
        expect(last_response).to be_ok
        result = JSON.parse(last_response.body)
        expect(result['loggedIn']).to eql true
        expect(result['user']).not_to be_nil
        expect(result['user']['id']).to eql user.id
        expect(result['user']['name']).to eql user.name
        expect(result['user']['email']).to eql user.email
      end
    end

    context 'when the user is NOT logged in' do
      let(:session) { {} }

      it 'gets the status for the session' do
        get '/api/sessions', {}.to_json, rack_env
        expect(last_response).not_to be_ok
        expect(last_response.status).to eql 401
        result = JSON.parse(last_response.body)
        expect(result['loggedIn']).to eql false
        expect(result['user']).to be_nil
      end
    end
  end
end
