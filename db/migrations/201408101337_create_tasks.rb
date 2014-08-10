Sequel.migration do
  change do
    create_table(:tasks) do
      primary_key :id
      String   :title, null: false
      Boolean  :completed, null: false, default: false
      Boolean  :archived, null: false, default: false
      Integer  :order, null: false, default: 0
      DateTime :created_at
      DateTime :updated_at
      Date     :complete_by
    end
  end
end
