class CreatePortfolioHistories < ActiveRecord::Migration[5.2]
  def change
    create_table :portfolio_histories do |t|
      t.integer :user_id, null: false
      t.timestamps
    end
    add_index :portfolio_histories, :user_id, unique: true
  end
end
