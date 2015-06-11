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
        redirect '/', to: '/index.html'
        get '/api/tasks', to: 'tasks#index'
        get '/api/tasks/archive', to: 'tasks#archive'
        get '/api/tasks/new', to: 'tasks#new'
        post '/api/tasks', to: 'tasks#create'
        patch '/api/tasks/:id/complete', to: 'tasks#complete'
        delete '/api/tasks/:id', to: 'tasks#delete'
        post '/api/sessions', to: 'sessions#create'
        delete '/api/sessions', to: 'sessions#delete'
        get '/api/sessions', to: 'sessions#status'
      end

      # assets << ['public']

      serve_assets true

      configure :development do
        handle_exceptions false
        serve_assets true
      end

      configure :test do
        host 'test.host'
        serve_assets false
      end
    end
  end
end

Lotus::View.configure do
  root 'app/templates'
end

module Todo
  module Authenticable
    def self.included(base)
      base.class_eval do
        include Lotus::Action
        include Lotus::Action::Session
        before :authenticate!

        def current_user
          @current_user ||= UserRepository.find(session[:user_id]) if session[:user_id]
        end

        def user_signed_in
          @user_signed_in = !!current_user if @user_signed_in.nil?
          @user_signed_in
        end

        private
        def authenticate!
          halt 401 unless user_signed_in
        end
      end
    end
  end
end
