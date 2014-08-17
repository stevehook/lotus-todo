module Todo
  module Controllers
    class Tasks
      include Lotus::Controller

      action 'Index' do
        expose :presenter

        def call(params)
          @presenter = Presenters::TasksPresenter.new(TaskRepository.incomplete)
        end
      end

      action 'New' do
        expose :presenter

        def call(params)
          @presenter = Presenters::TaskPresenter.new(Task.new)
        end
      end

      action 'Create' do
        expose :presenter

        def call(params)
          task = Task.new(params[:task])
          TaskRepository.persist(task)
          @presenter = Presenters::TaskPresenter.new(task)
          redirect_to '/' if accept?('text/html')
        end
      end
    end
  end
end

