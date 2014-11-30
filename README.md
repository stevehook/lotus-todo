#lotus-todo

A simple app to experiment with lotusrb and angular.js.

The back-end is implemented with a lotusrb server on a PostgreSQL
database. The front-end is built with the Yeoman angular generator.

##Database setup

`lotus-todo` uses `lotus-model` to interface to a PostgreSQL database.
`lotus-model` uses the `sequel` gem which provides the database
management toolchain.

`sequel` has migrations but doesn't have a tool equivalent to active
record's `rake db:create` so you can just use the PostgreSQL `createdb`
command:

    $ createdb --no-password lotus_todo_development
    $ createdb --no-password lotus_todo_test

To run migrations:

    $ sequel postgres://localhost/lotus_todo_development -m app/db/migrations
    $ sequel postgres://localhost/lotus_todo_test -m app/db/migrations

You will also need to configure the database connection details for the
dev environment. `dotenv` is used to keep this kind of configuration in
a environment variables defined in a .env file. You'll have to create
your own .env file but you can use the template provided:

    $ cp .env.template .env

There is also some seed data:

    $ bundle exec ruby app/db/seeds/tasks.rb

##Tests

###Back-end

Tests are written in RSpec and (assuming you have set up the test
database) can be run with:

    $ bundle exec rspec spec

###Front-end

For the front-end we use Node.js, npm, bower and grunt. First install
Node.js, then use npm to install bower and grunt at a system level:

    $ cd ng-app
    $ npm install -g grunt-cli
    $ npm install -g bower

Then you can install other node modules at a project level

    $ npm install

You can then use bower to install the various front-end packages (e.g.
Angular):

    $ bower install

Tests are written in Jasmine and can be run via grunt:

    $ cd ng-app && grunt test

##Running the development server

The most convenient way to run a development server is to use the
Node.js connect server to run the front-end, as well as running the lotusrb
back-end. So assuming you've started PostgreSQL and set up the database
(see above) start the back-end with:

    $ bundle exec rackup config.ru

or you can use the given Procfile and foreman/forego, e.g.

    $ forego start -p 9292

and in a separate shell start the front-end:

    $ cd ng-app && grunt serve

Then point your browser at `http://localhost:9000`.

To get this working we use the [grunt-connect-proxy plugin](https://github.com/drewzboto/grunt-connect-proxy).
This configures the connect server to forward all requests to `/api` to
the lotusrb server.

##Deploying to a production server

The application can be easily deployed to Heroku using the Ruby
buildpack that Heroku automatically picks up. However you need to build
the static assets (HTML/CSS/JS) before deployment so that they can be
picked up from the lotusrb server running on the production server.
(The alternative would be to configure multiple buildpacks (Node.js as
well as the Ruby one so that you could install and build using Grunt as
part of the deployment).

You can do this in a separate git *build* branch to keep master clean.

    $ git co build
    $ cd ng-app
    $ grunt build --force
    $ git add -A
    $ git commit -m 'new build'

Assuming you have logged in to your Heroku account you can create and
deploy the app with:

    $ heroku create
    $ git push heroku build:master

To setup the database or run migrations after a deploy:

    $ heroku run sequel `heroku config:get DATABASE_URL` -m app/db/migrations
