class Api::TransactionsController < ApplicationController

  def create
    @transaction = Transaction.new(transaction_params)
    if @transaction.save
      render "api/transactions/create"
    else
      render json: @transaction.errors.full_messages, status: 422
    end
  end

  def shares
    @shares = User.find_shares(params[:user_id].to_i,(params[:stock_id]).to_i)
  end

  def allshares
    @allshares = User.find_all_shares(params[:user_id])
  end

  private
  def transaction_params
    params.require(:transaction).permit(:user_id, :stock_id,:amount,:price)
  end
end
