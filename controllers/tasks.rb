module Todo
  module Controllers
    class Tasks
      include Lotus::Controller

      action 'Index' do
        expose :tasks

        def call(params)
          @tasks = TaskRepository.incomplete
        end
      end

      action 'New' do
        expose :task

        def call(params)
          @task = Task.new
        end
      end

      action 'Create' do
        expose :task

        def call(params)
          @task = Task.new(params[:task])
          TaskRepository.persist(@task)
          redirect_to '/'
        end
      end
    end
  end
end

