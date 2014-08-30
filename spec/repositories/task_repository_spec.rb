require 'spec_helper'
require 'app/entities/task'
require 'app/repositories/task_repository'
require 'app/config/mapper'

describe TaskRepository do
  let(:todo1) { Task.new(title: 'Thing 1', completed: false) }
  let(:todo2) { Task.new(title: 'Thing 2', completed: false) }
  let(:todo3) { Task.new(title: 'Thing 3', completed: true) }
  let(:todos) { [todo1, todo2, todo3] }

  before do
    todos.each { |todo| TaskRepository.persist(todo) }
  end

  after do
    TaskRepository.clear
  end

  describe '#incomplete' do
    it 'only returns the incomplete tasks' do
      expect(described_class.incomplete.collect(&:id)).to eql([todo1.id, todo2.id])
    end
  end

  describe '#complete' do
    it 'sets the completed flag and updates the record' do
      expect{ described_class.complete(todo1) }.to change{ described_class.incomplete.count }.by(-1)
      expect(todo1.completed).to eql true
    end
  end
end

