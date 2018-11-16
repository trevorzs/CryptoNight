import {RECEIVE_STOCK, RECEIVE_STOCKS, RECEIVE_PRICE, RECEIVE_DATA} from '../actions/stocks_actions';
import {merge} from 'lodash';

const StocksReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
      case RECEIVE_STOCK:
        return merge({}, state, {[action.stock.id]:action.stock});
      case RECEIVE_STOCKS:
        return merge({},action.stocks);
      case RECEIVE_PRICE:
        newState = merge({},state);
        newState[action.id].price = action.price;
        return newState;
      case RECEIVE_DATA:
        newState = merge({},state);
        const syms = action.symbols.map((arr)=>(arr[0]));
        const ids = action.symbols.map((arr)=>(arr[1]));
        let sym;
        let priceVar;
        let roundedPrice
        for (var i = 0; i < syms.length; i++) {
          sym = syms[i];
          priceVar = action.data[sym].USD;
          roundedPrice = Number((priceVar).toFixed(3))
          newState[ids[i]].price = `$${roundedPrice}`;
        }
        return newState;
      default:
        return state;
    }
}

export default StocksReducer;
