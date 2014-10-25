Sequel.migration do
  change do
    add_column :tasks, :user_id, Integer, null: false
  end
end
