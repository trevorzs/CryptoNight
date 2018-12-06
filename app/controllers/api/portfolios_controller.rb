class Api::PortfoliosController < ApplicationController

  def create
    @portfolio = Portfolio.new(portfolio_params)
    @portfolio.portfolio_history_id = current_user.portfolio_history.id
    if @portfolio.save
      render "api/portfolios/create"
    else
      render json: @portfolio.errors.full_messages, status: 422
    end
  end

  private
  def watchlist_params
    params.require(:portfolio).permit(:shares)
  end
end
