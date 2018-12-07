class Transaction < ApplicationRecord
  validates :stock_id, :user_id, :price, :amount, presence: true

  after_create :add_portfolio

  belongs_to :user,
    foreign_key: :user_id,
    class_name: 'User'

  belongs_to :stock,
    foreign_key: :stock_id,
    class_name: 'Stock'

  def add_portfolio
    User.find(self.user_id).portfolios
  end


end
