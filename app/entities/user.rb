class User
  include Hanami::Entity
  attributes :id, :name, :email, :created_at, :updated_at
end
