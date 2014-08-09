class Task
  include Lotus::Entity
  self.attributes = :title, :completed, :archived, :order, :complete_by
end
