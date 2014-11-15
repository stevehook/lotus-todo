class User
  include Lotus::Entity
  self.attributes = :id, :name, :email, :created_at, :updated_at
end
