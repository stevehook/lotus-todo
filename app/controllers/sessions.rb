require 'hanami/action/session'

module Todo
  module Controllers
    class Sessions
      include Hanami::Controller
      class Create
        include Hanami::Action
        accept :json

        def call(params)
          user_params = params[:credentials]
          user = UserRepository.find_by_email(user_params['email'])
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

        private

        def verify_csrf_token?
          false
        end
      end

      class Status
        include Hanami::Action

        def call(params)
          user = UserRepository.find_or_nil(session[:user_id])
          if !user.nil?
            result = { loggedIn: true, user: { id: user.id, name: user.name, email: user.email } }
            self.body = result.to_json
            self.status = 200
          else
            self.body = { loggedIn: false }.to_json
            self.status = 401
          end
        end
      end

      class Delete
        include Hanami::Action

        def call(params)
          session[:user_id] = nil
          self.body = '{}'
          self.status = 200
        end

        private

        def verify_csrf_token?
          false
        end
      end
    end
  end
end
