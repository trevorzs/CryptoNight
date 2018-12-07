class Portfolio < ApplicationRecord
  belongs_to :portfolio_history,
    foreign_key: :portfolio_history_id,
    class_name: 'PortfolioHistory'

end
