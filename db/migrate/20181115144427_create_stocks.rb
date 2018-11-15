class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :name, null: false
      t.string :symbol, null: false
      t.string :details, null: false
      t.integer :change, allow_nil: true
      t.integer :tag_id, allow_nil: true
    end
    add_index :stocks, :tag_id, unique: true
  end
end
