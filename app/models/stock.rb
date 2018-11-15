class Stock < ApplicationRecord
  validates :name, :symbol, presence: true, uniqueness: true
  validates :details, presence: true

  
end
