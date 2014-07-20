# config.ru
require 'lotus'
require_relative 'application'

run Lotus::Router.new {
  mount Todo::Application, at: '/'
}
