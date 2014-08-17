require 'spec_helper'

feature 'API' do
  let(:todo1) { Task.new(title: 'Thing 1', completed: false) }
  let(:todo2) { Task.new(title: 'Thing 2', completed: true) }
  let(:todo3) { Task.new(title: 'Thing 3', completed: false) }
  let(:todos) { [todo1, todo2, todo3] }

  before do
    todos.each { |todo| TaskRepository.persist(todo) }
    header 'Accept', 'application/json'
  end

  after do
    TaskRepository.clear
  end

  describe 'GET /' do
    it 'gets the list of tasks' do
      get '/'
      expect(last_response).to be_ok
      result = JSON.parse(last_response.body)
      expect(result.count).to eql 2
      expect(result.first['title']).to eql 'Thing 1'
      expect(result.last['title']).to eql 'Thing 3'
    end
  end

  describe 'POST /tasks' do
    it 'returns 200 and creates a new task' do
      post '/tasks', { task: { title: 'New Thing' } }.to_json, { 'CONTENT_TYPE' => 'application/json' }
      expect(last_response).to be_ok
      expect(TaskRepository.incomplete.count).to eql 3
    end
  end

  describe 'DELETE /tasks/:id' do
    it 'returns 200 and deletes the given task' do
      delete "/tasks/#{todo1.id}", {}, { 'CONTENT_TYPE' => 'application/json' }
      expect(last_response).to be_ok
      expect(TaskRepository.incomplete.count).to eql 1
    end
  end
end

