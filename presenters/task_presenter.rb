module Presenters
  class TaskPresenter
    def initialize(task)
      @task = task
    end

    def to_h
      {
        id: @task.id,
        title: @task.title,
        completed: @task.completed,
        archived: @task.archived,
        order: @task.order,
        created_at: @task.created_at,
        updated_at: @task.updated_at,
        complete_by: @task.complete_by
      }
    end
  end
end
