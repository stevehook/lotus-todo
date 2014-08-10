class Task
  include Lotus::Entity
  self.attributes = :id, :title, :completed, :archived, :order, :created_at, :updated_at, :complete_by
end
