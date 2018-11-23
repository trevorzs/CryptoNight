class Stock < ApplicationRecord
  validates :name, :symbol, presence: true, uniqueness: true
  validates :details, presence: true

  has_many :watchlistJoins,
    foreign_key: :watchlist_id,
    class_name: 'WatchlistJoin'

  has_many :transactions,
      foreign_key: :stock_id,
      class_name: 'Transaction'


  def self.find_by_query(query)
    query = "#{query}%"
    Stock.where("name ilike ? OR symbol ilike ?",query,query)
  end

end
