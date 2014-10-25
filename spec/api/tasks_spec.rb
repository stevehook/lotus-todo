require 'spec_helper'

feature 'API' do
  let(:todo1) { Task.new(title: 'Thing 1', completed: false, user_id: 1) }
  let(:todo2) { Task.new(title: 'Thing 2', completed: true, user_id: 1) }
  let(:todo3) { Task.new(title: 'Thing 3', completed: false, user_id: 1) }
  let(:todo4) { Task.new(title: 'Thing 4', completed: true, archived_at: DateTime.civil(2014, 1, 1), user_id: 1) }
  let(:todos) { [todo1, todo2, todo3, todo4] }

  before do
    todos.each { |todo| TaskRepository.persist(todo) }
    header 'Accept', 'application/json'
  end

  after do
    TaskRepository.clear
  end

  describe 'GET /api/tasks' do
    it 'gets the list of unarchived tasks' do
      get '/api/tasks'
      expect(last_response).to be_ok
      result = JSON.parse(last_response.body)
      expect(result.count).to eql 3
      expect(result.first['title']).to eql 'Thing 1'
      expect(result.last['title']).to eql 'Thing 3'
    end
  end

  describe 'GET /api/tasks/archive' do
    it 'gets the list of archived tasks' do
      get '/api/tasks/archive'
      expect(last_response).to be_ok
      result = JSON.parse(last_response.body)
      expect(result.count).to eql 1
      expect(result.first['title']).to eql 'Thing 4'
    end
  end

  describe 'POST /api/tasks' do
    it 'returns 200 and creates a new task' do
      post '/api/tasks', { task: { title: 'New Thing' } }.to_json, { 'CONTENT_TYPE' => 'application/json' }
      expect(last_response).to be_ok
      expect(TaskRepository.incomplete.count).to eql 3
    end
  end

  describe 'POST /api/tasks/:id/complete' do
    it 'returns 200 and updates the given task' do
      post "/api/tasks/#{todo1.id}/complete", {}, { 'CONTENT_TYPE' => 'application/json' }
      expect(last_response).to be_ok
      expect(TaskRepository.incomplete.count).to eql 1
    end
  end

  describe 'DELETE /api/tasks/:id' do
    it 'returns 200 and deletes the given task' do
      delete "/api/tasks/#{todo1.id}", {}, { 'CONTENT_TYPE' => 'application/json' }
      expect(last_response).to be_ok
      expect(TaskRepository.incomplete.count).to eql 1
    end
  end
end

