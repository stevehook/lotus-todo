require 'dotenv'
Dotenv.load

require 'tilt/erb'
require 'lotus'
require 'lotus-model'

module Todo
  class Application < Lotus::Application
    configure do
      root File.dirname(__FILE__)

      load_paths << [
        'entities',
        'repositories',
        'controllers',
        'config',
        'views',
        'presenters'
      ]
      routes do
        get '/', to: 'tasks#index'
        get '/tasks/new', to: 'tasks#new'
        post '/tasks', to: 'tasks#create'
        delete '/tasks/:id', to: 'tasks#delete'
      end
    end
  end
end

Lotus::View.configure do
  root 'app/templates'
end

