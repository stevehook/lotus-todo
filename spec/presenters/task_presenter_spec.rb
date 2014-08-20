require 'spec_helper'
require 'app/entities/task'
require 'app/presenters/task_presenter'

describe Presenters::TaskPresenter do
  let(:entity) { Task.new(id: 123, title: 'Thing 1', completed: true) }

  subject { described_class.new(entity) }

  it 'exposes the encapsulated task' do
    expect(subject.task).to eql entity
  end

  describe '#to_json' do
    let(:json) { subject.to_json }

    it 'serialises the given task' do
      expect(json).to be_a String
      expect(json).to match /"id":123/
    end

    it 'generates valid JSON' do
      JSON.parse(json)
    end
  end

  describe '#to_h' do
    it 'returns a hash of the given task' do
      expect(subject.to_h).to eql({
        id: 123,
        title: 'Thing 1',
        completed: true,
        archived: false,
        order: 0,
        created_at: nil,
        updated_at: nil,
        complete_by: nil
      })
    end
  end
end
