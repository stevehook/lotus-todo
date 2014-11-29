require 'lotus/action/session'

module Todo
  module Controllers
    class Sessions
      include Lotus::Controller

      action 'Create' do
        include Lotus::Action::Session

        def call(params)
          user_params = params[:credentials]
          user = UserRepository.find_by_email(user_params[:email])
          if user
            session[:user_id] = user.id
            self.body = '{}'
            self.status = 200
          else
            session[:user_id] = nil
            self.body = '{}' #TODO: error message
            self.status = 401
          end
        end
      end

      action 'Status' do
        include Lotus::Action::Session

        def call(params)
          user = UserRepository.find_or_nil(session[:user_id])
          result = { loggedIn: !user.nil? }
          result.merge!(user: { id: user.id, name: user.name, email: user.email }) if user
          self.body = result.to_json
          self.status = 200
        end
      end

      action 'Delete' do
        include Lotus::Action::Session

        def call(params)
          session[:user_id] = nil
          self.body = '{}'
          self.status = 200
        end
      end
    end
  end
end
