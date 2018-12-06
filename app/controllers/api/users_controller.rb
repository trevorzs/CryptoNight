class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @shares = User.find_all_shares(params[:user_id])
  end


  def create
    @user = User.new(user_params)
    @user.funds = 0;
    if @user.save
      Transaction.create!([{
          user_id: @user.id,
          stock_id: Stock.find_by(symbol: "BTC").id,
          price: 4444,
          amount:1
        }])
        WatchlistJoin.create!([{
            watchlist_id: @user.watchlist.id,
            stock_id: Stock.find_by(symbol: "BTC").id,
          }])
        PortfolioHistory.create!([{
            user_id: @user.id
          }])
      login!(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render "api/users/show"
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :email, :first_name, :last_name, :funds)
  end
end
