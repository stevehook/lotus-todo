require 'spec_helper'
require 'entities/task'
require 'repositories/task_repository'

describe TaskRepository do
  let(:todo1) { Task.new(title: 'Thing 1', completed: true) }
  let(:todo2) { Task.new(title: 'Thing 2', completed: true) }
  let(:todo3) { Task.new(title: 'Thing 3', completed: false) }
  let(:todos) { [todo1, todo2, todo3] }

  before do
    todos.each { |todo| binding.pry; TaskRepository.persist(todo) }
  end

  describe '#incomplete' do
    it 'only returns the incomplete tasks' do
      expect(described_class.incomplete).to eql([todo1, todo2])
    end
  end
end

