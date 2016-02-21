require 'hanami/model'

class TaskRepository
  include Hanami::Repository

  PAGE_SIZE = 20

  def self.find_by_user(user_id, id)
    query do
      where(user_id: user_id, id: id)
    end.first
  end

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
