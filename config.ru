# config.ru
require 'lotus'
require_relative 'app/application'
require 'rack/parser'
require 'rack-session-sequel'

use Rack::Parser, :parsers => {
  'application/json' => proc { |data| JSON.parse data }
}
use Rack::Session::Sequel, :db_uri => ENV['DATABASE_URL'], :expire_after => 600

run Lotus::Router.new {
  mount Todo::Application, at: '/'
}
