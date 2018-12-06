class RemoveTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :asset_value
  end
end
