class User
  include Lotus::Entity
  attributes :id, :name, :email, :created_at, :updated_at
end
