require 'spec_helper'
require 'app/controllers/tasks'
require 'app/presenters/task_presenter'
require 'app/presenters/tasks_presenter'
require 'app/entities/task'
require 'app/repositories/task_repository'

describe Todo::Controllers::Tasks do
  let(:task1) { Task.new(title: 'Thing 1', completed: false) }
  let(:task2) { Task.new(title: 'Thing 2', completed: false) }
  let(:task3) { Task.new(title: 'Thing 3', completed: true) }
  let(:task4) { Task.new(title: 'Thing 4', completed: true, archived_at: DateTime.civil(2014, 1, 1)) }
  let(:task5) { Task.new(title: 'Thing 5', completed: true, archived_at: DateTime.civil(2014, 2, 22)) }
  let(:unarchived_tasks) { [task1, task2, task3] }
  let(:archived_tasks) { [task4, task5] }
  let(:tasks) { [task1, task2, task3, task4] }

  before do
    TaskRepository.stub(:unarchived).and_return(unarchived_tasks)
    TaskRepository.stub(:archived).and_return(archived_tasks)
    TaskRepository.stub(:persist).and_return(true)
  end

  describe Todo::Controllers::Tasks::Index do
    let(:action) { described_class.new }
    it 'retrieves a collection of unarchived tasks' do
      action.call({})
      expect(action.exposures[:presenter].tasks).to eql unarchived_tasks
    end
  end

  describe Todo::Controllers::Tasks::Archive do
    let(:action) { described_class.new }
    it 'retrieves a collection of archived tasks' do
      action.call({})
      expect(action.exposures[:presenter].tasks).to eql archived_tasks
    end
  end

  describe Todo::Controllers::Tasks::New do
    let(:action) { described_class.new }
    it 'create a new task object' do
      action.call({})
      expect(action.exposures[:presenter].task).to be_a Task
    end
  end

  describe Todo::Controllers::Tasks::Create do
    let(:action) { described_class.new }
    it 'persists a new tasks object' do
      expect(TaskRepository).to receive(:persist).with(Task.new title: 'new task')
      action.call(task: { title: 'new task' })
    end

    it 'whitelists attributes' do
      pending 'whitelisting params not implemented in lotus-controller 0.2.0'
      expect(TaskRepository).to receive(:persist).with(Task.new title: 'new task')
      action.call(task: { title: 'new task', not_an_attribute: 'foo' })
    end
  end
end
