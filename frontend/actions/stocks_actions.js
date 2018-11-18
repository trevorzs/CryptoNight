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

const historicFetches = (sym,id,dispatch) => {
  const obj = {};
  const check = () => {
    const completed = ((Boolean(obj.price) && Boolean(obj.daily) && Boolean(obj.weekly) && Boolean(obj.monthly) && Boolean(obj.yearly) && Boolean(obj.news)));
    if (completed) {
      dispatch(receiveStockData(obj));
    }
  }

  StocksApiUtil.fetchPrice(sym,id).then(response=>{
      obj.price = response.USD;
      check();
  });
  StocksApiUtil.fetchStockDaily(sym).then(response=>{
      obj.daily = response.Data;
      check();
  });
  StocksApiUtil.fetchStockWeekly(sym,id).then(response=>{
      obj.weekly = response.Data;
      check();
  });
  StocksApiUtil.fetchStockMonthly(sym,id).then(response=>{
      obj.monthly = response.Data;
      check();
  });
  StocksApiUtil.fetchStockYearly(sym,id).then(response=>{
      obj.yearly = response.Data;
      check();
  });
  StocksApiUtil.fetchNews(sym,id).then(response=>{
    obj.news = response.Data;
    check();
  })

  return (obj);
}

export const fetchStock = (id) => dispatch => (
  StocksApiUtil.fetchStock(id).then(
    stock => dispatch(receiveStock(stock))
  ).then(response=>{
    historicFetches(response.stock.symbol, response.stock.id, dispatch);
    // dispatch(receiveStockData(historicFetches(response.stock.symbol,response.stock.id)))
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

export const fetchStocksData = (arr) => dispatch => {
  return (
    StocksApiUtil.fetchStocksData(arr).then(
      data => {
        dispatch(receiveData(data,arr))
      }
    )
  )
}
