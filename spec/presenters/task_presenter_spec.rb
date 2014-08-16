require 'spec_helper'
require 'entities/task'
require 'presenters/task_presenter'

describe Presenters::TaskPresenter do
  let(:entity) { Task.new(id: 123, title: 'Thing 1', completed: true) }

  subject { described_class.new(entity) }

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
