Sequel.migration do
  change do
    add_column :tasks, :archived_at, DateTime
    drop_column :tasks, :archived
  end
end
