require 'dotenv'
Dotenv.load

require 'tilt/erb'
require 'lotus'
require 'lotus-model'

module Todo
  class Application < Lotus::Application
    configure do
      # root File.dirname(__FILE__)

      load_paths << [
        'entities',
        'repositories',
        'controllers',
        'config',
        'views'
      ]
      routes do
        get '/', to: 'tasks#index'
      end
    end
  end
end

Lotus::View.configure do
  root 'templates'
end
