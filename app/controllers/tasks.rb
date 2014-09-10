module Todo
  module Controllers
    class Tasks
      include Lotus::Controller

      action 'Index' do
        expose :presenter

        def call(params)
          @presenter = Presenters::TasksPresenter.new(TaskRepository.unarchived)
          self.body = @presenter.to_json
        end
      end

      action 'Archive' do
        expose :presenter

        def call(params)
          @presenter = Presenters::TasksPresenter.new(TaskRepository.archived)
          self.body = @presenter.to_json
        end
      end

      action 'New' do
        expose :presenter

        def call(params)
          @presenter = Presenters::TaskPresenter.new(Task.new)
          self.body = @presenter.to_json
        end
      end

      action 'Create' do
        expose :presenter

        def call(params)
          task = Task.new(params[:task])
          TaskRepository.persist(task)
          @presenter = Presenters::TaskPresenter.new(task)
          self.body = @presenter.to_json
        end
      end

      action 'Delete' do
        expose :presenter

        def call(params)
          task = TaskRepository.find(params[:id])
          TaskRepository.delete(task)
          @presenter = Presenters::TaskPresenter.new(task)
          self.body = @presenter.to_json
        end
      end

      action 'Complete' do
        expose :presenter

        def call(params)
          task = TaskRepository.find(params[:id])
          TaskRepository.complete(task)
          @presenter = Presenters::TaskPresenter.new(task)
          self.body = @presenter.to_json
        end
      end
    end
  end
end

