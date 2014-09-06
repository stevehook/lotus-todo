require 'json'

module Presenters
  class TaskPresenter
    attr_reader :task

    def initialize(task)
      @task = task
    end

    def to_h
      {
        id: @task.id,
        title: @task.title,
        completed: @task.completed,
        order: @task.order,
        created_at: @task.created_at,
        updated_at: @task.updated_at,
        complete_by: @task.complete_by,
        archived_at: @task.archived_at
      }
    end

    def to_json
      to_h.to_json
    end
  end
end
