require 'lotus/action/session'

module Todo
  module Controllers
    class Tasks
      include Lotus::Controller

      action 'Index' do
        include Todo::Authenticable
        expose :presenter

        def call(params)
          @presenter = Presenters::TasksPresenter.new(TaskRepository.unarchived(current_user.id))
          self.body = @presenter.to_json
        end
      end

      action 'Archive' do
        include Todo::Authenticable
        expose :presenter

        def call(params)
          @presenter = Presenters::TasksPresenter.new(TaskRepository.archived(current_user.id))
          self.body = @presenter.to_json
        end
      end

      action 'New' do
        include Todo::Authenticable
        expose :presenter

        def call(params)
          @presenter = Presenters::TaskPresenter.new(Task.new)
          self.body = @presenter.to_json
        end
      end

      action 'Create' do
        include Todo::Authenticable
        expose :presenter

        def call(params)
          task = Task.new(params[:task])
          task.user_id = current_user.id
          TaskRepository.persist(task)
          @presenter = Presenters::TaskPresenter.new(task)
          self.body = @presenter.to_json
        end
      end

      action 'Delete' do
        include Todo::Authenticable
        expose :presenter

        def call(params)
          task = TaskRepository.find(params[:id])
          TaskRepository.delete(task)
          @presenter = Presenters::TaskPresenter.new(task)
          self.body = @presenter.to_json
        end
      end

      action 'Complete' do
        include Todo::Authenticable
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

