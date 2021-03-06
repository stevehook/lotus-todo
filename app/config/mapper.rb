require 'pg'
require 'hanami/model'
require 'hanami/model/adapters/sql_adapter'

mapper = Hanami::Model::Mapper.new do
  collection :tasks do
    entity Task

    attribute :id,           Integer
    attribute :title,        String
    attribute :completed,    Boolean
    attribute :order,        Integer
    attribute :created_at,   DateTime
    attribute :updated_at,   DateTime
    attribute :complete_by,  Date
    attribute :archived_at,  DateTime
    attribute :user_id,      Integer
  end

  collection :users do
    entity User

    attribute :id,           Integer
    attribute :name,         String
    attribute :email,        String
    attribute :created_at,   DateTime
    attribute :updated_at,   DateTime
  end
end

adapter = Hanami::Model::Adapters::SqlAdapter.new(mapper, ENV.fetch('DATABASE_URL'))

TaskRepository.adapter = adapter
UserRepository.adapter = adapter

Mutex.new.synchronize do
  mapper.load!
end

MAPPER = mapper
