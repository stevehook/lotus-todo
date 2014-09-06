require 'bundler'
require 'dotenv'
Dotenv.load

require 'sequel'

DB = Sequel.connect(ENV.fetch('DATABASE_URL'))

DB.run "DELETE FROM tasks"

DB.run "INSERT INTO tasks(title, completed, complete_by)
        VALUES('Walk the dog', false, '2014-08-10')"
DB.run "INSERT INTO tasks(title, completed, complete_by)
        VALUES('Cook dinner', false, '2014-08-10')"
DB.run "INSERT INTO tasks(title, completed, complete_by)
        VALUES('Learn node.js', false, '2014-08-14')"
DB.run "INSERT INTO tasks(title, completed, complete_by, archived_at)
        VALUES('Learn Ruby on Rails', false, '2012-08-14', '2014-08-14')"

