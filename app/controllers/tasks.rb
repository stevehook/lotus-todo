require 'lotus/action/session'

module Todo
  module Controllers
    class Tasks
      include Lotus::Controller

      class Index
        include Todo::Authenticable
        expose :presenter

        def call(params)
          @presenter = Presenters::TasksPresenter.new(TaskRepository.unarchived(current_user.id))
          self.body = @presenter.to_json
        end
      end

      class Archived
        include Todo::Authenticable
        expose :presenter

        def call(params)
          @presenter = Presenters::TasksPresenter.new(TaskRepository.archived(current_user.id))
          self.body = @presenter.to_json
        end
      end

      class New
        include Todo::Authenticable
        expose :presenter

        def call(params)
          @presenter = Presenters::TaskPresenter.new(Task.new)
          self.body = @presenter.to_json
        end
      end

      class Create
        include Todo::Authenticable
        expose :presenter

        def call(params)
          task = Task.new(params[:task])
          task.user_id = current_user.id
          task = TaskRepository.persist(task)
          @presenter = Presenters::TaskPresenter.new(task)
          self.body = @presenter.to_json
        end
      end

      class Delete
        include Todo::Authenticable
        expose :presenter

        def call(params)
          task = TaskRepository.find_by_user(current_user.id, params[:id])
          halt 404 if task.nil?
          TaskRepository.delete(task)
          @presenter = Presenters::TaskPresenter.new(task)
          self.body = @presenter.to_json
        end
      end

      class Complete
        include Todo::Authenticable
        expose :presenter

        def call(params)
          task = TaskRepository.find_by_user(current_user.id, params[:id])
          halt 404 if task.nil?
          TaskRepository.complete(task)
          @presenter = Presenters::TaskPresenter.new(task)
          self.body = @presenter.to_json
        end
      end

      class Archive
        include Todo::Authenticable
        expose :presenter

        def call(params)
          task = TaskRepository.find_by_user(current_user.id, params[:id])
          halt 404 if task.nil?
          TaskRepository.archive(task)
          @presenter = Presenters::TaskPresenter.new(task)
          self.body = @presenter.to_json
        end
      end
    end
  end
end

