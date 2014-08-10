require 'bundler'
require 'dotenv'
Dotenv.load

require 'sequel'

DB = Sequel.connect(ENV.fetch('DATABASE_URL'))

DB.run "INSERT INTO tasks(title, completed, archived, complete_by)
        VALUES('Walk the dog', false, false, '2014-08-10')"
DB.run "INSERT INTO tasks(title, completed, archived, complete_by)
        VALUES('Cook dinner', false, false, '2014-08-10')"
DB.run "INSERT INTO tasks(title, completed, archived, complete_by)
        VALUES('Learn node.js', false, false, '2014-08-14')"

