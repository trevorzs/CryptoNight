class Changecolumns < ActiveRecord::Migration[5.2]
  def change
    remove_column :transactions, :price
    add_column :transactions, :price, :float, null: false
  end
end
