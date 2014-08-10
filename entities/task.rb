class Task
  include Lotus::Entity
  self.attributes = :id, :title, :completed, :archived, :order, :created_at, :updated_at, :complete_by

  def initialize(attributes = {})
    super
    self.completed ||= false
    self.archived ||= false
    self.order ||= 0
  end
end
