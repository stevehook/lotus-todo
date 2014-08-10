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
end

