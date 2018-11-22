class WatchlistJoin < ApplicationRecord
  belongs_to :watchlist,
    foreign_key: :watchlist_id,
    class_name: 'Watchlist'

  belongs_to :stock,
    foreign_key: :stock_id,
    class_name: 'Stock'

  validates :stock_id, uniqueness: {scope: :watchlist_id}
end
