class WatchlistJoins < ActiveRecord::Migration[5.2]
  def change
    create_table :watchlist_joins do |t|
      t.integer :watchlist_id, null: false
      t.integer :stock_id, null: false
      t.timestamps
    end
    add_index :watchlist_joins, :watchlist_id, unique: true
    add_index :watchlist_joins, :stock_id, unique: true
  end
end
