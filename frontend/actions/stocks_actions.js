import * as StocksApiUtil from '../util/stocks_api_util';

export const RECEIVE_STOCKS = "RECEIVE_STOCKS";
export const RECEIVE_STOCK = "RECEIVE_STOCK";
export const RECEIVE_PRICE = "RECEIVE_PRICE";

export const receivePrice = (price,id) => {
  return (
    {
      type:RECEIVE_PRICE,
      price: price.USD,
      id
    }
  )
}

export const receiveStock = (stock) => {
  return (
    {
      type: RECEIVE_STOCK,
      stock
    }
  )
}


export const receiveStocks = (stocks) => (
  {
    type: RECEIVE_STOCKS,
    stocks
  }
)

export const fetchStock = (id) => dispatch => (
  StocksApiUtil.fetchStock(id).then(
    stock => dispatch(receiveStock(stock))
  )
)

export const fetchStocks = () => dispatch => (
  StocksApiUtil.fetchStocks().then(
    stocks => dispatch(receiveStocks(stocks))
  )
)

export const fetchPrice = (sym,id) => dispatch => (
  StocksApiUtil.fetchPrice(sym).then(
    price => dispatch(receivePrice(price,id))
  )
)
