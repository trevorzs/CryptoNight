class ChangeTransactions < ActiveRecord::Migration[5.2]
  def change
    add_column :transactions, :user_funds, :float, null: false
  end
end
