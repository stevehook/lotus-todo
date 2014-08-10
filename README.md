#lotus-todo

A simple app to experiment with lotusrb.

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

Tests are written in RSpec and (assuming you have set up the test
database) can be run with:

    $ bundle exec rspec spec
