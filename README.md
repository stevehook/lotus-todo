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

    $ sequel postgres://localhost/lotus_todo_development -m db/migrations
    $ sequel postgres://localhost/lotus_todo_test -m db/migrations

##Tests

###Back-end

Tests are written in RSpec and (assuming you have set up the test
database) can be run with:

    $ bundle exec rspec spec

###Front-end

Tests are written in Jasmine and can be run via grunt:

    $ cd ng-app && grunt test

##Running the development server

The most convenient way to run a development server is to use the
Node.js connect server to run the front-end, as well as running the lotusrb
back-end. So assuming you've started PostgreSQL and set up the database
(see above) start the back-end with:

    $ bundle exec rackup config.ru

and in a separate shell start the front-end:

    $ cd ng-app && grunt serve

Then point your browser at `http://localhost:9000`.

To get this working we use the [grunt-connect-proxy plugin](https://github.com/drewzboto/grunt-connect-proxy).
This configures the connect server to forward all requests to `/api` to
the lotusrb server.

##Deploying to a production server




