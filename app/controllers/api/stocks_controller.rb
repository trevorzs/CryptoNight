class Api::StocksController < ApplicationController
  def show
    @stock = Stock.find(params[:id])
  end

  def create
  end

  def index
    @stocks = Stock.all
  end

  def search
    @stocks = Stock.find_by_query(params[:query])
  end
end
