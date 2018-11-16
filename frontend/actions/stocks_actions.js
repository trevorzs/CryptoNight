import * as StocksApiUtil from '../util/stocks_api_util';

export const RECEIVE_STOCKS = "RECEIVE_STOCKS";
export const RECEIVE_STOCK = "RECEIVE_STOCK";
export const RECEIVE_PRICE = "RECEIVE_PRICE";
export const RECEIVE_DATA = "RECEIVE_DATA";
export const RECEIVE_STOCK_DATA = "RECEIVE_STOCK_DATA";
export const RECEIVE_SYMBOLS = "RECEIVE_SYMBOLS";

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

export const receiveStockData = (data) => {
  return (
    {
      type:RECEIVE_STOCK_DATA,
      data
    }
  )
}

export const receiveStocks = (stocks) => {
    return (
      {
        type: RECEIVE_STOCKS,
        stocks,
        symbols: (Object.keys(stocks).map((id)=>
          stocks[id].symbol
        ))
      }
  )
}

export const receiveSymbols = (symbols) => {
  {
    type: RECEIVE_SYMBOLS,
    symbols
  }
}

export const receiveData = (data,symbols) => (
  {
    type: RECEIVE_DATA,
    data,
    symbols
  }
)

const historicFetches = (sym,id) => {
  const obj = {};
  obj.price = StocksApiUtil.fetchPrice(sym,id);
  obj.daily = StocksApiUtil.fetchStockDaily(sym);
  obj.weekly = StocksApiUtil.fetchStockWeekly(sym);
  obj.monthly = StocksApiUtil.fetchStockMonthly(sym);
  obj.yearly = StocksApiUtil.fetchStockYearly(sym);
  return (obj);
}

export const fetchStock = (id) => dispatch => (
  StocksApiUtil.fetchStock(id).then(
    stock => dispatch(receiveStock(stock))
  ).then(response=>{
    dispatch(fetchPrice(response.stock.symbol,response.stock.id))
  })
)

export const fetchStocks = () => dispatch => (
  StocksApiUtil.fetchStocks().then(
    stocks => dispatch(receiveStocks(stocks))
  ).then(response=>{
    dispatch(fetchStocksData(Object.keys(response.stocks).map((id)=>([response.stocks[id].symbol,id]))))
  })
)

export const fetchPrice = (sym,id) => dispatch => (
  StocksApiUtil.fetchPrice(sym).then(
    price => dispatch(receivePrice(price,id))
  )
)

export const fetchStocksData = (symbols) => dispatch => {
  return (
    StocksApiUtil.fetchStocksData(symbols).then(
      data => {
        dispatch(receiveData(data,symbols))
      }
    )
  )
}
