class RemoveAssetsColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :portfolios, :assets
  end
end
