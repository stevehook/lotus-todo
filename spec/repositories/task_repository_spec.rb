require 'spec_helper'
require 'app/entities/user'
require 'app/entities/task'
require 'app/repositories/user_repository'
require 'app/repositories/task_repository'
require 'app/config/mapper'

describe TaskRepository do
  let(:todo1) { Task.new(title: 'Thing 1', user_id: 1) }
  let(:todo2) { Task.new(title: 'Thing 2', user_id: 1) }
  let(:todo3) { Task.new(title: 'Thing 3', completed: true, user_id: 1) }
  let(:todo4) { Task.new(title: 'Thing 4', completed: true, archived_at: DateTime.civil(2014, 1, 1), user_id: 1) }
  let(:another_users_todo1) { Task.new(title: 'Thing 1', user_id: 2) }
  let(:another_users_todo2) { Task.new(title: 'Thing 2', completed: true, user_id: 2) }
  let(:another_users_todo3) { Task.new(title: 'Thing 3', completed: true, archived_at: DateTime.civil(2014, 1, 1), user_id: 2) }
  let(:todos) { [todo1, todo2, todo3, todo4, another_users_todo1, another_users_todo2, another_users_todo3] }

  before do
    todos.each { |todo| TaskRepository.persist(todo) }
  end

  after do
    TaskRepository.clear
  end

  describe '#incomplete' do
    it 'only returns the incomplete tasks for the given user' do
      binding.pry
      expect(described_class.incomplete(1).collect(&:id)).to eql([todo1.id, todo2.id])
    end
  end

  describe '#unarchived' do
    it 'only returns the unarchived tasks for the given user' do
      expect(described_class.unarchived(1).collect(&:id)).to eql([todo1.id, todo2.id, todo3.id])
    end
  end

  describe '#archived' do
    it 'only returns the archived tasks for the given user' do
      expect(described_class.archived(1).collect(&:id)).to eql([todo4.id])
    end
  end

  describe '#archive' do
    let(:now) { DateTime.civil(2014, 1, 1) }
    it 'sets the archived flag and updates the record' do
      allow(DateTime).to receive(:now) { now }
      expect{ described_class.archive(todo1) }.to change{ described_class.unarchived(1).count }.by(-1)
      expect(todo1.archived_at).to eql now
    end
  end

  describe '#complete' do
    it 'sets the completed flag and updates the record' do
      expect{ described_class.complete(todo1) }.to change{ described_class.incomplete(1).count }.by(-1)
      expect(todo1.completed).to eql true
    end
  end
end

