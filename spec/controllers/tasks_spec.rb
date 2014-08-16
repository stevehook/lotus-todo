require 'spec_helper'
require 'controllers/tasks'
require 'entities/task'
require 'repositories/task_repository'

describe Todo::Controllers::Tasks do
  let(:task1) { Task.new(title: 'Thing 1', completed: false) }
  let(:task2) { Task.new(title: 'Thing 2', completed: false) }
  let(:task3) { Task.new(title: 'Thing 3', completed: true) }
  let(:tasks) { [task1, task2, task3] }

  before do
    TaskRepository.stub(:incomplete).and_return(tasks)
    TaskRepository.stub(:persist).and_return(true)
  end

  describe Todo::Controllers::Tasks::Index do
    let(:action) { described_class.new }
    it 'retrieves a collection of tasks' do
      action.call({})
      expect(action.exposures[:presenter].tasks).to eql tasks
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
