require 'lotus/model'

class TaskRepository
  include Lotus::Repository
  self.collection = :tasks

  def incomplete
  end
end
