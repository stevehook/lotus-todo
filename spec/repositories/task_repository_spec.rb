require 'spec_helper'
require 'app/entities/task'
require 'app/repositories/task_repository'
require 'app/config/mapper'

describe TaskRepository do
  let(:todo1) { Task.new(title: 'Thing 1') }
  let(:todo2) { Task.new(title: 'Thing 2') }
  let(:todo3) { Task.new(title: 'Thing 3', completed: true) }
  let(:todo4) { Task.new(title: 'Thing 4', completed: true, archived_at: DateTime.civil(2014, 1, 1)) }
  let(:todos) { [todo1, todo2, todo3, todo4] }

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

  describe '#unarchived' do
    it 'only returns the unarchived tasks' do
      expect(described_class.unarchived.collect(&:id)).to eql([todo1.id, todo2.id, todo3.id])
    end
  end

  describe '#archived' do
    it 'only returns the archived tasks' do
      expect(described_class.archived.collect(&:id)).to eql([todo4.id])
    end
  end

  describe '#archive' do
    let(:now) { DateTime.civil(2014, 1, 1) }
    it 'sets the archived flag and updates the record' do
      DateTime.stub(:now) { now }
      expect{ described_class.archive(todo1) }.to change{ described_class.unarchived.count }.by(-1)
      expect(todo1.archived_at).to eql now
    end
  end

  describe '#complete' do
    it 'sets the completed flag and updates the record' do
      expect{ described_class.complete(todo1) }.to change{ described_class.incomplete.count }.by(-1)
      expect(todo1.completed).to eql true
    end
  end
end

