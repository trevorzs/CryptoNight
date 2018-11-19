class Watchlist < ApplicationRecord
  belongs_to :user,
    foreign_key: :user_id,
    class_name: 'User'

  has_many :WatchlistJoins,
    foreign_key: :watchlist_id,
    class_name: 'WatchlistJoin'

end
