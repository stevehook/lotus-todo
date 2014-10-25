require 'lotus/action/session'

module Todo
  module Controllers
    class Sessions
      include Lotus::Controller

      action 'Create' do
        include Lotus::Action::Session

        def call(params)
          user = UserRepository.find_by_email(params[:email])
          if user
            session[:user_id] = user.id
            self.body = {}
          else
            session[:user_id] = nil
            self.body = {} #TODO: Add an error message
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
