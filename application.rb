require 'tilt/erb'
require 'lotus'

module Todo
  class Application < Lotus::Application
    configure do
      # root File.dirname(__FILE__)

      load_paths << [
        'config',
        'controllers',
        'views',
        'entities',
        'repositories'
      ]
      routes do
        get '/', to: 'home#index'
      end
    end
  end
end

Lotus::View.configure do
  root 'templates'
end
