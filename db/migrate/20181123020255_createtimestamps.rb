class Createtimestamps < ActiveRecord::Migration[5.2]
  def change
     add_column :transactions, :created_at, :datetime, null: false
  end
end
