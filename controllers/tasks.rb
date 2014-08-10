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
    end
  end
end

