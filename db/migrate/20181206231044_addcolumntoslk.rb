class Addcolumntoslk < ActiveRecord::Migration[5.2]
  def change
    add_column :portfolios, :account_value, :float
  end
end
