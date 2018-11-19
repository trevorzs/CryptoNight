class Stock < ApplicationRecord
  validates :name, :symbol, presence: true, uniqueness: true
  validates :details, presence: true

  def self.find_by_query(query)
    query = "#{query}%"
    Stock.where("name ilike ? OR symbol ilike ?",query,query)
  end
end
