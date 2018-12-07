class Chageindeixces < ActiveRecord::Migration[5.2]
  def change
    remove_index :portfolios, :portfolio_history_id
    add_index :portfolios, :portfolio_history_id, :unique => false
  end
end
