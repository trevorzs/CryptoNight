import {RECEIVE_STOCK,
        RECEIVE_STOCKS,
        RECEIVE_PRICE,
        RECEIVE_DATA,
         RECEIVE_QUERY,
        CLEAR_DATA,
        RECEIVE_WATCHLIST_DATA,
        RECEIVE_ALT_STOCKS_DATA,
        RECEIVE_SORTED_STOCKS
        } from '../actions/stocks_actions';
import {merge} from 'lodash';

const StocksReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;
    let ids, symbols, data;
    switch (action.type) {
      case RECEIVE_STOCK:
        newState = merge({},state);
        newState[action.stock.id] = action.stock;
        return merge({}, state, {[action.stock.id]:action.stock});
      case RECEIVE_STOCKS:
        newState = merge({},state);
        ids = Object.keys(action.stocks);
        for (var i = 0; i < ids.length; i++) {
          newState[ids[i]] = action.stocks[ids[i]];
          newState[ids[i]].price = "loading";
          newState[ids[i]].todayChange = "loading";
        }
        return newState;
      case CLEAR_DATA:
        return {};
      case RECEIVE_PRICE:
        newState = merge({},state);
        newState[action.id].price = action.price;
        return newState;
      case RECEIVE_DATA:
        newState = merge({},state);
        const syms = action.symbols.map((arr)=>(arr[0]));
        ids = action.symbols.map((arr)=>(arr[1]));
        let sym, priceVar, change;
        for (var i = 0; i < syms.length; i++) {
          sym = syms[i];
          data = action.data.RAW[sym].USD;
          newState[ids[i]].USD = data;
        }
        return newState;
      case RECEIVE_WATCHLIST_DATA:
        newState = merge({},state);
        let stock;
        for (var i = 0; i < action.ids.length; i++) {
          stock = newState[action.ids[i]];
          newState[action.ids[i]].USD = action.obj.stocks[stock.symbol].USD;
          newState[action.ids[i]].daily = action.obj.stocks[stock.symbol].daily;
        }
        return newState;
      case RECEIVE_ALT_STOCKS_DATA:
        return action.data;
      case RECEIVE_SORTED_STOCKS:
        return action.stocks;
      default:
        return state;
    }
}

export default StocksReducer;
