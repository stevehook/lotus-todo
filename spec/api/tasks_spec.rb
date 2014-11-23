require 'spec_helper'

feature 'Tasks API' do
  let(:user) { User.new(name: 'Bob Roberts', email: 'bob@example.com') }
  let(:another_user) { User.new(name: 'Archie Roberts', email: 'archie@example.com') }
  let(:todo1) { Task.new(title: 'Thing 1', completed: false, user_id: user.id) }
  let(:todo2) { Task.new(title: 'Thing 2', completed: true, user_id: user.id) }
  let(:todo3) { Task.new(title: 'Thing 3', completed: false, user_id: user.id) }
  let(:todo4) { Task.new(title: 'Thing 4', completed: true, archived_at: DateTime.civil(2014, 1, 1), user_id: user.id) }
  let(:another_users_todo1) { Task.new(title: 'Thing 1', user_id: another_user.id) }
  let(:another_users_todo2) { Task.new(title: 'Thing 1', completed: true, archived_at: DateTime.civil(2014, 1, 1), user_id: another_user.id) }
  let(:users) { [user, another_user] }
  let(:todos) { [todo1, todo2, todo3, todo4, another_users_todo1, another_users_todo2] }

  before do
    users.each { |user| UserRepository.persist(user) }
    todos.each { |todo| TaskRepository.persist(todo) }
    header 'Accept', 'application/json'
  end

  after do
    TaskRepository.clear
  end

  context 'when not logged in' do
    it 'cannot get the list of unarchived tasks - returns 401' do
      get '/api/tasks'
      expect(last_response).not_to be_ok
      pending
      expect(last_response.code).to_eql 401
    end
  end

  context 'when logged in' do
    let(:session) { { user_id: user.id } }
    let(:rack_env) { { 'rack.session' => session, 'CONTENT_TYPE' => 'application/json' } }

    describe 'GET /api/tasks' do
      it 'gets the list of unarchived tasks for the current user only' do
        get '/api/tasks', {}, rack_env
        expect(last_response).to be_ok
        result = JSON.parse(last_response.body)
        expect(result.count).to eql 3
        expect(result.first['title']).to eql 'Thing 1'
        expect(result.last['title']).to eql 'Thing 3'
      end
    end

    describe 'GET /api/tasks/archive' do
      it 'gets the list of archived tasks for the current user only' do
        get '/api/tasks/archive', {}, rack_env
        expect(last_response).to be_ok
        result = JSON.parse(last_response.body)
        expect(result.count).to eql 1
        expect(result.first['title']).to eql 'Thing 4'
      end
    end

    describe 'POST /api/tasks' do
      it 'returns 200 and creates a new task' do
        post '/api/tasks', { task: { title: 'New Thing' } }.to_json, rack_env
        expect(last_response).to be_ok
        expect(TaskRepository.incomplete(user.id).count).to eql 3
      end

      it 'creates a task for the current user only'
    end

    describe 'POST /api/tasks/:id/complete' do
      it 'returns 200 and updates the given task' do
        post "/api/tasks/#{todo1.id}/complete", {}, rack_env
        expect(last_response).to be_ok
        expect(TaskRepository.incomplete(user.id).count).to eql 1
      end

      it 'returns 401 if I attempt to complete a task for a different user'
    end

    describe 'DELETE /api/tasks/:id' do
      it 'returns 200 and deletes the given task' do
        delete "/api/tasks/#{todo1.id}", {}, rack_env
        expect(last_response).to be_ok
        expect(TaskRepository.incomplete(user.id).count).to eql 1
      end

      it 'returns 401 if I attempt to delete a task for a different user'
    end
  end
end

