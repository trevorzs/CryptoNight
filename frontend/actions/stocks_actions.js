import * as StocksApiUtil from '../util/stocks_api_util';
import {doneLoading} from './ui_actions';

export const RECEIVE_STOCKS = "RECEIVE_STOCKS";
export const RECEIVE_STOCK = "RECEIVE_STOCK";
export const RECEIVE_PRICE = "RECEIVE_PRICE";
export const RECEIVE_DATA = "RECEIVE_DATA";
export const RECEIVE_STOCK_DATA = "RECEIVE_STOCK_DATA";
export const RECEIVE_SYMBOLS = "RECEIVE_SYMBOLS";
export const RECEIVE_STOCKS_REQUEST = "RECEIVE_STOCKS_REQUEST";
export const RECEIVE_QUERY = "RECEIVE_QUERY";
export const CLEAR_SEARCH = "CLEAR_SEARCH";
export const CLEAR_DATA = "CLEAR_DATA";
export const RECEIVE_WATCHLIST_DATA = "RECEIVE_WATCHLIST_DATA";
export const RECEIVE_NEWS = "RECEIVE_NEWS";
export const RECEIVE_ALT_STOCKS_DATA = "RECEIVE_ALT_STOCKS_DATA";

export const receiveNews = (news) => {
  return({
    type: RECEIVE_NEWS,
    news
  })
}

export const receiveWatchlistData = (obj,ids) => {

  return({
    type: RECEIVE_WATCHLIST_DATA,
    obj,
    ids
  })
}

export const clearSearch = () => {
  return({
    type: CLEAR_SEARCH
  })
}

export const clearData = () => {
  return({
    type: CLEAR_DATA
  })
}

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

export const receiveStocksRequest = (stocks) => {
  return (
    {
      type: RECEIVE_STOCKS_REQUEST,
      stocks
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

export const receiveQuery = (stocks,query) => (
  {
    type: RECEIVE_QUERY,
    stocks,
    query
  }
)

export const receiveAltStocksData = (data,syms) =>{
  return(
    {
      type: RECEIVE_ALT_STOCKS_DATA,
      data,
      syms
    }
  )
}


const watchlistDailyFetch = (syms,response,dispatch) => {
  let done = 0;
  const obj = {stocks: response.RAW }
  let symbols = syms.map((arr)=>(arr[0]));
  let ids = syms.map((arr)=>(arr[1]));
  for (let i = 0; i < symbols.length; i++) {
    StocksApiUtil.altFetchStockDaily(symbols[i]).then(
      response => {
        obj.stocks[symbols[i]].id = ids[i];
        obj.stocks[symbols[i]].daily = response.Data;
        done++;
        if (done >= symbols.length){
          dispatch(receiveWatchlistData(obj,ids));
          dispatch(doneLoading());
        }
      }
    )
  }
}

const watchlistDataFetch = (syms) => {
  return (dispatch) => {
    return(StocksApiUtil.fetchStocksData(syms).then(response=>{
      watchlistDailyFetch(syms,response,dispatch)
    }
    ))
  }
}

const moreData = (stocks,dispatch,watchlist) => {
  const obj = {};
  const syms = Object.keys(stocks).map(id=>(
    [stocks[id].symbol,id]
  ));
  StocksApiUtil.altFetchStocksData(syms).then(
    response => {
      const data = Object.assign({},stocks);
      const arr = [];
      for (var i = 0; i < syms.length; i++) {
        data[syms[i][1]].USD = response.RAW[syms[i][0]].USD;
        if (watchlist.includes(parseInt(syms[i][1]))){
          arr.push(syms[i]);
        }
      }
      const symbols = arr.map((subarr)=>(subarr[0]));
      dispatch(fetchAllNews(syms));
      dispatch(watchlistDataFetch(arr));
      dispatch(receiveAltStocksData(data,symbols));
    }
  )
}

export const altFetchStocks = (watchlist) => dispatch => (
  StocksApiUtil.fetchStocks().then(
    stocks => {
      moreData(stocks,dispatch,watchlist)
    }
  )
)

const historicFetches = (sym,id,dispatch) => {
  const obj = {};
  const check = () => {
    const completed = ((Boolean(obj.price) && Boolean(obj.daily) && Boolean(obj.weekly) && Boolean(obj.monthly) && Boolean(obj.yearly) && Boolean(obj.news) && Boolean(obj.trimonthly) && Boolean(obj.fiveyearly)));
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
  StocksApiUtil.fetchStockTriMonthly(sym,id).then(response=>{
      obj.trimonthly = response.Data;
      check();
  });
  StocksApiUtil.fetchStockYearly(sym,id).then(response=>{
      obj.yearly = response.Data;
      check();
  });
  StocksApiUtil.fetchStockFiveYearly(sym,id).then(response=>{
      obj.fiveyearly = response.Data;
      check();
  });
  StocksApiUtil.fetchNews(sym,id).then(response=>{
    obj.news = response.Data;
    check();
  })

  return (obj);
}


export const queryStocks = (query) => dispatch => (
  StocksApiUtil.queryStocks(query).then(
    stocks => dispatch(receiveQuery(stocks,query))
  )
)

export const fetchStock = (id) => dispatch => (
  StocksApiUtil.fetchStock(id).then(
    stock => dispatch(receiveStock(stock))
  ).then(response=>{
    historicFetches(response.stock.symbol, response.stock.id, dispatch);
    // dispatch(receiveStockData(historicFetches(response.stock.symbol,response.stock.id)))
  })
)

export const requestStocks = () => dispatch => (
  StocksApiUtil.fetchStocks().then(
    stocks => dispatch(receiveStocks(stocks))
  )
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
    ).then(response=>dispatch(doneLoading()))
  )
}

export const fetchAllNews = (syms) => dispatch => {
  return(
    StocksApiUtil.fetchAllNews(syms).then(
      response => dispatch(receiveNews(response))
    )
  )
}

export const altFetchStocksData = (syms) => dispatch => {
  return(
    StocksApiUtil.altFetchStocksData(syms).then(
      response => dispatch(receiveAltStocksData(response,syms))
    )
  )
}
