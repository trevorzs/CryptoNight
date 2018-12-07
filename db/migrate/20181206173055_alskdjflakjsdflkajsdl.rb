class Alskdjflakjsdflkajsdl < ActiveRecord::Migration[5.2]
  def change
    remove_column :transactions, :user_funds
    add_column :transactions, :user_value, :float
  end
end
