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

      action 'Delete' do
        include Lotus::Action::Session

        def call(params)
          session[:user_id] = nil
          self.body = {}
        end
      end
    end
  end
end
