require 'rubygems'
require 'bundler/setup'
require 'hanami/setup'
require_relative '../app/application'

Hanami::Container.configure do
  mount Todo::Application, at: '/'
end

