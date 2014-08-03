$:.unshift __dir__ + '/..'
require 'rubygems'
require 'bundler'
Bundler.require(:default, :test)
require 'rspec'
require 'capybara/rspec'
require 'application'

module RSpec
  module FeatureExampleGroup
    def self.included(group)
      group.metadata[:type] = :feature
      Capybara.app = Todo::Application.new
      Capybara.register_driver :rack_test do |app|
        Capybara::RackTest::Driver.new(app, :headers => { 'HTTP_ACCEPT' => 'text/html' })
      end
    end
  end
end

RSpec.configure do |c|
  def c.escaped_path(*parts)
    Regexp.compile(parts.join('[\\\/]') + '[\\\/]')
  end

  c.color = true

  c.include RSpec::FeatureExampleGroup, type: :feature, example_group: {
    file_path: c.escaped_path(%w[spec features])
  }

  c.include Capybara::DSL, type: :feature
end

# $:.unshift __dir__ + '/..'
# ENV['RACK_ENV'] ||= 'test'
# require 'rubygems'
# require 'bundler'
# Bundler.require(:default, :test)
# require 'rspec'
# require 'capybara/rspec'
# require 'application'
# # require 'lotus/model/adapters/memory_adapter'

# # We don't need very safe password in test environment
# # BCrypt::Engine.cost = 1

# # adapter = Application.setup_adapter do
# #   name     :test
# #   type     Lotus::Model::Adapters::MemoryAdapter
# #   mapper   :default
# # end

# module RSpec
#   module FeatureExampleGroup
#     def self.included(group)
#       group.metadata[:type] = :feature
#       Capybara.app = Rack::Builder.new do
#         use Rack::Session::Cookie, secret: 'foo'
#         use Rack::MethodOverride
#         run Todo::Application.new
#       end
#     end
#   end
# end

# RSpec.configure do |c|
#   def c.escaped_path(*parts)
#     Regexp.compile(parts.join('[\\\/]') + '[\\\/]')
#   end

#   c.color = true

#   c.include RSpec::FeatureExampleGroup, type: :feature, example_group: {
#     file_path: c.escaped_path(%w[spec features])
#   }

#   c.include Capybara::DSL, type: :feature

#   # c.before do
#   #   Application.mapper(:default).collections.each do |collection|
#   #     adapter.clear collection.first
#   #   end
#   # end
# end
