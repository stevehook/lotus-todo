require 'bundler'
require 'dotenv'
Dotenv.load

require 'sequel'

DB = Sequel.connect(ENV.fetch('DATABASE_URL'))

if DB[:users].first.nil?
  DB.run "INSERT INTO users(name, email)
          VALUES('Bob Roberts', 'bob@example.com')"
end

