# config.ru
require 'lotus'
require_relative 'application'
require 'rack/parser'

use Rack::Parser, :parsers => {
  'application/json' => proc { |data| JSON.parse data }
}

run Lotus::Router.new {
  mount Todo::Application, at: '/'
}
