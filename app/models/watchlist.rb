class Watchlist < ApplicationRecord
  belongs_to :user,
    foreign_key: :user_id,
    class_name: 'User'

  has_many :watchlistJoins,
    foreign_key: :watchlist_id,
    class_name: 'WatchlistJoin'

  has_many :stocks,
    through: :watchlistJoins,
    source: :stock

end
