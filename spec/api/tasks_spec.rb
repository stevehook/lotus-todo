require 'spec_helper'

feature 'Tasks API' do
  let(:user) { UserRepository.persist(User.new(name: 'Bob Roberts', email: 'bob@example.com')) }
  let(:another_user) { UserRepository.persist(User.new(name: 'Archie Roberts', email: 'archie@example.com')) }
  let(:todo1) { create_task(title: 'Thing 1', completed: false, user_id: user.id) }
  let(:todo2) { create_task(title: 'Thing 2', completed: true, user_id: user.id) }
  let(:todo3) { create_task(title: 'Thing 3', completed: false, user_id: user.id) }
  let(:todo4) { create_task(title: 'Thing 4', completed: true, archived_at: DateTime.civil(2014, 1, 1), user_id: user.id) }
  let(:another_users_todo1) { create_task(title: 'Thing 1', user_id: another_user.id) }
  let(:another_users_todo2) { create_task(title: 'Thing 1', completed: true, archived_at: DateTime.civil(2014, 1, 1), user_id: another_user.id) }
  let!(:users) { [user, another_user] }
  let!(:todos) { [todo1, todo2, todo3, todo4, another_users_todo1, another_users_todo2] }

  def create_task(attributes)
    TaskRepository.persist(Task.new(attributes))
  end

  before do
    header 'Accept', 'application/json'
  end

  after do
    TaskRepository.clear
  end

  context 'when not logged in' do
    let(:rack_env) { {} }

    it 'cannot get the list of unarchived tasks - returns 401' do
      get '/api/tasks', {}, rack_env
      expect(last_response).not_to be_ok
      expect(last_response.status).to eql 401
    end

    it 'cannot get the list of archived tasks - returns 401' do
      get '/api/tasks/archived', {}, rack_env
      expect(last_response).not_to be_ok
      expect(last_response.status).to eql 401
    end

    it 'cannot complete a task - returns 401' do
      patch "/api/tasks/#{todo1.id}/complete", {}, rack_env
      expect(last_response).not_to be_ok
      expect(last_response.status).to eql 401
    end

    it 'cannot delete a task - returns 401' do
      delete "/api/tasks/#{another_users_todo1.id}", {}, rack_env
      expect(last_response).not_to be_ok
      expect(last_response.status).to eql 401
    end
  end

  context 'when logged in' do
    let(:session) { { user_id: user.id } }
    let(:rack_env) { { 'rack.session' => session } }

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

    describe 'GET /api/tasks/archived' do
      it 'gets the list of archived tasks for the current user only' do
        get '/api/tasks/archived', {}, rack_env
        expect(last_response).to be_ok
        result = JSON.parse(last_response.body)
        expect(result.count).to eql 1
        expect(result.first['title']).to eql 'Thing 4'
      end
    end

    describe 'POST /api/tasks' do
      it 'returns 200 and creates a new task' do
        post '/api/tasks', { task: { title: 'New Thing' } }, rack_env
        expect(last_response).to be_ok
        expect(TaskRepository.incomplete(user.id).count).to eql 3
      end

      it 'creates a task for the current user only' do
        post '/api/tasks', { task: { title: 'New Thing' } }, rack_env
        result = JSON.parse(last_response.body)
        expect(result['user_id']).to eql user.id
        expect(TaskRepository.find(result['id']).user_id).to eql user.id
      end
    end

    describe 'POST /api/tasks/:id/complete' do
      it 'returns 200 and updates the given task' do
        patch "/api/tasks/#{todo1.id}/complete", {}, rack_env
        expect(last_response).to be_ok
        expect(TaskRepository.incomplete(user.id).count).to eql 1
      end

      it 'returns 404 if I attempt to complete a task for a different user' do
        post "/api/tasks/#{another_users_todo1.id}/complete", {}, rack_env
        expect(last_response).not_to be_ok
        expect(last_response.status).to eql 404
        expect(TaskRepository.incomplete(another_user.id).count).to eql 1
      end
    end

    describe 'DELETE /api/tasks/:id' do
      it 'returns 200 and deletes the given task' do
        delete "/api/tasks/#{todo1.id}", {}, rack_env
        expect(last_response).to be_ok
        expect(TaskRepository.incomplete(user.id).count).to eql 1
      end

      it 'returns 404 if I attempt to delete a task for a different user' do
        delete "/api/tasks/#{another_users_todo1.id}", {}, rack_env
        expect(last_response).not_to be_ok
        expect(last_response.status).to eql 404
        expect(TaskRepository.incomplete(another_user.id).count).to eql 1
      end
    end
  end
end

