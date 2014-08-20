module Presenters
  class TasksPresenter
    attr_reader :tasks

    def initialize(tasks)
      @tasks = tasks
    end

    def to_json
      @tasks.map{ |task| Presenters::TaskPresenter.new(task).to_h }.to_json
    end
  end
end
