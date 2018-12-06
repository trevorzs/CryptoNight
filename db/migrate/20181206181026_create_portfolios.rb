class CreatePortfolios < ActiveRecord::Migration[5.2]
  def change
    create_table :portfolios do |t|
      t.integer :portfolio_history_id, null: false
      t.string :assets
      t.timestamps
    end
    add_index :portfolios, :portfolio_history_id, unique: true
  end
end
