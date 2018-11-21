class Api::WatchlistJoinsController < ApplicationController
  def create
    @watchlistJoin = WatchlistJoin.new(watchlist_params)
    if @watchlistJoin.save
      render "api/watchlistjoins/create"
    end
  end

  private
  def watchlist_params
    params.require(:watchlistJoin).permit(:watchlist_id, :stock_id)
  end
end
