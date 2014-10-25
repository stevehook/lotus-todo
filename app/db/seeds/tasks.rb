require 'bundler'
require 'dotenv'
Dotenv.load

require 'sequel'

DB = Sequel.connect(ENV.fetch('DATABASE_URL'))

DB.run "DELETE FROM tasks"
DB.run "DELETE FROM users"

DB.run "INSERT INTO users(name, email)
        VALUES('Bob Roberts', 'bob@example.com')"

user_id = DB[:users].first[:id]

DB.run "INSERT INTO tasks(title, completed, complete_by, user_id)
        VALUES('Walk the dog', false, '2014-08-10', #{user_id})"
DB.run "INSERT INTO tasks(title, completed, complete_by, user_id)
        VALUES('Cook dinner', false, '2014-08-10', #{user_id})"
DB.run "INSERT INTO tasks(title, completed, complete_by, user_id)
        VALUES('Learn node.js', false, '2014-08-14', #{user_id})"
DB.run "INSERT INTO tasks(title, completed, complete_by, archived_at, user_id)
        VALUES('Learn Ruby on Rails', false, '2012-08-14', '2014-08-14', #{user_id})"

