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
        redirect '/', to: 'index.html'
        get '/api/tasks', to: 'tasks#index'
        get '/api/tasks/archive', to: 'tasks#archive'
        get '/api/tasks/new', to: 'tasks#new'
        post '/api/tasks', to: 'tasks#create'
        post '/api/tasks/:id/complete', to: 'tasks#complete'
        delete '/api/tasks/:id', to: 'tasks#delete'
      end
    end
  end
end

Lotus::View.configure do
  root 'app/templates'
end

