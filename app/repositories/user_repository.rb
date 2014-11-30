require 'lotus/model'

class UserRepository
  include Lotus::Repository
  self.collection = :users

  PAGE_SIZE = 20

  def self.find_or_nil(id)
    query do
      where(id: id)
    end.first
  end

  def self.find_by_email(email)
    query do
      where(email: email)
    end.first
  end
end
