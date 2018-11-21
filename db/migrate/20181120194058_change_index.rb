class ChangeIndex < ActiveRecord::Migration[5.2]
  def change
    remove_index :watchlist_joins, :watchlist_id
    add_index :watchlist_joins, :watchlist_id, :unique => false
  end
end
