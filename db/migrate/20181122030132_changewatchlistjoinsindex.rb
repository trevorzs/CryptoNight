class Changewatchlistjoinsindex < ActiveRecord::Migration[5.2]
  def change
    remove_index :watchlist_joins, :watchlist_id
    remove_index :watchlist_joins, :stock_id
    add_index :watchlist_joins, [:watchlist_id, :stock_id], unique: true
    add_index :watchlist_joins, :watchlist_id, :unique => false
  end
end
