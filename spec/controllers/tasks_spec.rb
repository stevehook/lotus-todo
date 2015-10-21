require 'spec_helper'
require 'app/controllers/tasks'
require 'app/presenters/task_presenter'
require 'app/presenters/tasks_presenter'
require 'app/entities/task'
require 'app/entities/user'
require 'app/repositories/task_repository'
require 'app/repositories/user_repository'

describe Todo::Controllers::Tasks do
  let(:user) { User.new(name: 'Bob Roberts', email: 'bob@example.com') }
  let(:task1) { Task.new(title: 'Thing 1', completed: false, user_id: user.id) }
  let(:task2) { Task.new(title: 'Thing 2', completed: false, user_id: user.id) }
  let(:task3) { Task.new(title: 'Thing 3', completed: true, user_id: user.id) }
  let(:task4) { Task.new(title: 'Thing 4', completed: true, archived_at: DateTime.civil(2014, 1, 1), user_id: user.id) }
  let(:task5) { Task.new(title: 'Thing 5', completed: true, archived_at: DateTime.civil(2014, 2, 22), user_id: user.id) }
  let(:unarchived_tasks) { [task1, task2, task3] }
  let(:archived_tasks) { [task4, task5] }
  let(:tasks) { [task1, task2, task3, task4] }
  let(:session) { { user_id: user.id } }

  before do
    allow(UserRepository).to receive(:find).and_return(user)
    allow(TaskRepository).to receive(:unarchived).and_return(unarchived_tasks)
    allow(TaskRepository).to receive(:archived).and_return(archived_tasks)
    allow(TaskRepository).to receive(:persist).and_return(true)
    allow(subject).to receive(:authenticate!) {}
    allow(subject).to receive(:current_user) { user }
  end

  describe Todo::Controllers::Tasks::Index do
    it 'retrieves a collection of unarchived tasks' do
      response = subject.call({})
      expect(response[0]).to eql 200
      expect(subject.exposures[:presenter].tasks).to eql unarchived_tasks
    end
  end

  describe Todo::Controllers::Tasks::Archived do
    it 'retrieves a collection of archived tasks' do
      response = subject.call({})
      expect(response[0]).to eql 200
      expect(subject.exposures[:presenter].tasks).to eql archived_tasks
    end
  end

  describe Todo::Controllers::Tasks::New do
    it 'create a new task object' do
      response = subject.call({})
      expect(response[0]).to eql 200
      expect(subject.exposures[:presenter].task).to be_a Task
    end
  end

  describe Todo::Controllers::Tasks::Create do
    it 'persists a new tasks object' do
      expect(TaskRepository).to receive(:persist).with(Task.new title: 'new task', user_id: user.id).and_return(Task.new id: 123, title: 'new task', user_id: user.id)
      response = subject.call(task: { title: 'new task' })
      expect(response[0]).to eql 200
    end

    it 'whitelists attributes' do
      expect(TaskRepository).to receive(:persist).with(Task.new title: 'new task')
      subject.call(task: { title: 'new task', not_an_attribute: 'foo' })
    end
  end
end
