require 'pg'
require 'lotus/model'
require 'lotus/model/adapters/sql_adapter'

mapper = Lotus::Model::Mapper.new do
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
end

adapter = Lotus::Model::Adapters::SqlAdapter.new(mapper, ENV.fetch('DATABASE_URL'))

TaskRepository.adapter = adapter

Mutex.new.synchronize do
  mapper.load!
end

MAPPER = mapper
