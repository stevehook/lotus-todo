require 'spec_helper'
require 'app/entities/task'
require 'app/presenters/task_presenter'
require 'app/presenters/tasks_presenter'

describe Presenters::TasksPresenter do
  let(:entity1) { Task.new(id: 123, title: 'Thing 1', completed: true) }
  let(:entity2) { Task.new(id: 456, title: 'Thing 2', completed: true) }
  let(:entities) { [entity1, entity2] }

  subject { described_class.new(entities) }

  it 'exposes tasks' do
    expect(subject.tasks).to eql entities
  end

  describe '#to_json' do
    let(:json) { subject.to_json }

    it 'serialises the tasks to JSON' do
      expect(json).to be_a String
      expect(json).to match /"id":123/
      expect(json).to match /"id":456/
    end

    it 'generates valid JSON' do
      JSON.parse(json)
    end
  end
end
