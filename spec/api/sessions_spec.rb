require 'spec_helper'

feature 'Session API' do
  let(:user) { User.new(name: 'Bob Roberts', email: 'bob@example.com') }

  before do
    UserRepository.persist(user)
    header 'Accept', 'application/json'
  end

  after do
    UserRepository.clear
  end

  describe 'POST /api/sessions' do
    it 'returns 401 and does not create a new session when invalid credentials are given' do
      post '/api/sessions', { user: { email: 'eric@example.com' } }.to_json, { 'CONTENT_TYPE' => 'application/json' }
      expect(last_response).not_to be_ok
    end

    it 'returns 200 and creates a new session when valid credentials are given' do
      post '/api/sessions', { user: { email: 'bob@example.com' } }.to_json, { 'CONTENT_TYPE' => 'application/json' }
      expect(last_response).to be_ok
    end
  end
end
