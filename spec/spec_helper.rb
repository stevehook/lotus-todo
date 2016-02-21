$:.unshift __dir__ + '/..'
require 'rubygems'
require 'bundler'
Bundler.require(:default, :test)
require 'rspec'
require 'capybara/rspec'

ENV['RACK_ENV'] = 'test'
ENV['DATABASE_URL'] = 'postgres://localhost/lotus_todo_test'

require 'app/application'

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

  module ApiExampleGroup
    include Rack::Test::Methods

    def self.included(group)
      group.metadata[:type] = :api
    end

    def app
      app = Todo::Application.new
      app.middleware.use Rack::Parser, :parsers => { 'application/json' => proc { |data| JSON.parse data } }
      app
    end
  end
end

RSpec.configure do |c|
  def c.escaped_path(*parts)
    Regexp.compile(parts.join('[\\\/]') + '[\\\/]')
  end

  c.color = true

  c.include RSpec::FeatureExampleGroup, type: :feature, file_path: c.escaped_path(%w[spec features])
  c.include RSpec::ApiExampleGroup, type: :api, file_path: c.escaped_path(%w[spec api])

  c.include Capybara::DSL, type: :feature
end

