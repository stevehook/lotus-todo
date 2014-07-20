module Todo
  module Views
    module Home
      class Index
        include Lotus::View

        def salutation
          'Hello'
        end

        def greet
          "#{ salutation }, #{ planet }!"
        end
      end
    end
  end
end
