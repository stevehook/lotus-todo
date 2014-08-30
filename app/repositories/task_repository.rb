require 'lotus/model'

class TaskRepository
  include Lotus::Repository
  self.collection = :tasks

  PAGE_SIZE = 20

  def self.incomplete
    query do
      where(completed: false).asc(:order).limit(PAGE_SIZE)
    end
  end

  def self.complete(task)
    task.completed = true
    self.update(task)
  end

end
