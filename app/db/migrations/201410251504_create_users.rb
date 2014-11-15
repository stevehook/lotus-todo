Sequel.migration do
  change do
    create_table(:users) do
      primary_key :id
      String   :name, null: false
      String   :email, null: false
      Boolean  :deleted, null: false, default: 'f'
      DateTime :created_at
      DateTime :updated_at
      DateTime :last_logged_in_at
    end
  end
end
