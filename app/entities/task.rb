class Task
  include Lotus::Entity
  self.attributes = :id, :title, :completed, :order, :created_at, :updated_at, :complete_by, :archived_at

  def initialize(attributes = {})
    super
    self.completed ||= false
    self.order ||= 0
  end
end
