# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :username, :session_token, :email, presence: true, uniqueness: true
  validates :password_digest, :first_name, :last_name, presence: true
  validates :password, length: {minimum: 6}, allow_nil: true

  has_one :watchlist,
    foreign_key: :user_id,
    class_name: 'Watchlist'

  has_many :transactions,
    foreign_key: :user_id,
    class_name: 'Transaction'

  has_many :shares,
    through: :transactions,
    source: :stock

  after_initialize :ensure_session_token
  after_create :assign_watchlist
  attr_reader :password

  def assign_watchlist
    self.create_watchlist
  end

  # def assign_bitcoin
  #   debugger
  #   Transaction.create(self.id)
  # end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username) unless user
    user = User.find_by(email: username) unless user
    return user if user && user.is_password?(password)
    nil
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
    self.session_token

  end

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end

  def self.find_shares(userId,stockId)
    Transaction.where("user_id = ? and stock_id = ?",userId, stockId).group(:stock_id).sum(:amount)
  end

  def self.find_all_shares(userId)
    am = Transaction.where("user_id = ?",userId).group(:stock_id).having("sum(amount) > 0").sum(:amount)
  end

end
