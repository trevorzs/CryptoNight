class Api::WatchlistJoinsController < ApplicationController

  def create
    @watchlistJoin = WatchlistJoin.new(watchlist_params)
    if @watchlistJoin.save
      render "api/watchlistjoins/create"
    else
      render json: @watchlistJoin.errors.full_messages, status: 422
    end
  end

  def destroy
    @watchlistJoin = WatchlistJoin.find_by(watchlist_params)
    if @watchlistJoin
      @watchlistJoin.delete
      render "api/watchlistjoins/delete"
    else
      render json: ["Stock not on watchlist"], status: 404
    end
  end

  private
  def watchlist_params
    params.require(:watchlistJoin).permit(:watchlist_id, :stock_id)
  end
end
