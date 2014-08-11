require 'spec_helper'

feature 'Home page' do
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

  it 'displays the list of tasks' do
    visit '/'
    expect(page.body).to match('Thing 1')
    expect(page.body).to match('Thing 2')
    expect(page.body).not_to match('Thing 3')
  end

  it 'index page has a link to the new task page' do
    visit '/'
    expect(page).to have_link 'New Task'
    click_link 'New Task'
    expect(current_path).to eql '/tasks/new'
  end

  it 'creates a new task and redirects to index page' do
    visit '/tasks/new'
    fill_in :task_title, with: 'my test task'
    expect { click_button 'Create Task' }.to change { TaskRepository.incomplete.count }.by 1
    expect(current_path).to eql('/')
    expect(page.body).to match('my test task')
  end
end

