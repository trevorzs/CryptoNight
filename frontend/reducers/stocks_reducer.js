import {RECEIVE_STOCK, RECEIVE_STOCKS, RECEIVE_PRICE, RECEIVE_DATA} from '../actions/stocks_actions';
import {merge} from 'lodash';

const StocksReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;
    let ids;
    switch (action.type) {
      case RECEIVE_STOCK:
        return merge({}, state, {[action.stock.id]:action.stock});
      case RECEIVE_STOCKS:
        newState = merge({},state);
        ids = Object.keys(action.stocks);
        newState.symbols=[];
        for (var i = 0; i < ids.length; i++) {
          newState[ids[i]] = action.stocks[ids[i]];
          newState.symbols.push([action.symbols[i],ids[i]])
        }
        return newState;
      case RECEIVE_PRICE:
        newState = merge({},state);
        newState[action.id].price = action.price;
        return newState;
      case RECEIVE_DATA:
        newState = merge({},state);
        const syms = action.symbols.map((arr)=>(arr[0]));
        ids = action.symbols.map((arr)=>(arr[1]));
        let sym, priceVar, change;
        // roundedPrice, cutPrice;
        for (var i = 0; i < syms.length; i++) {
          sym = syms[i];
          priceVar = action.data.DISPLAY[sym].USD.PRICE;
          change = action.data.DISPLAY[sym].USD.CHANGEPCT24HOUR;
          // cutPrice = parseFloat(priceVar.slice(2).replace(",",""));
          // roundedPrice = Number((cutPrice).toFixed(3))
          newState[ids[i]].price = `${priceVar}`;
          newState[ids[i]].todayChange = `${change}`;
        }
        return newState;
      default:
        return state;
    }
}

export default StocksReducer;
