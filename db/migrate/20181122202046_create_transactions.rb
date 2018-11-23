class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.integer :stock_id, null: false
      t.integer :user_id, null: false
      t.integer :price, null: false
      t.integer :amount, null: false
    end
    add_index :transactions, :stock_id, unique: false
    add_index :transactions, :user_id, unique: false
  end
end
