class PortfolioHistory < ApplicationRecord
  belongs_to :user,
    foreign_key: :user_id,
    class_name: 'User'

  has_many :portfolios,
    foreign_key: :portfolio_history_id,
    class_name: 'Portfolio'

end
