require 'lotus/model'

class TaskRepository
  include Lotus::Repository
  self.collection = :tasks

  PAGE_SIZE = 20

  def self.incomplete(user_id)
    query do
      where(completed: false, user_id: user_id).asc(:order).limit(PAGE_SIZE)
    end
  end

  def self.unarchived(user_id)
    query do
      where('archived_at IS NULL').where(user_id: user_id).asc(:order).limit(PAGE_SIZE)
    end
  end

  def self.archived(user_id)
    query do
      where('archived_at IS NOT NULL').where(user_id: user_id).asc(:order).limit(PAGE_SIZE)
    end
  end

  def self.complete(task)
    task.completed = true
    self.update(task)
  end

  def self.archive(task)
    task.archived_at = DateTime.now
    self.update(task)
  end

end
