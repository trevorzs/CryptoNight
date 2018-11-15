import {RECEIVE_STOCK, RECEIVE_STOCKS, RECEIVE_PRICE} from '../actions/stocks_actions';
import {merge} from 'lodash';

const StocksReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
      case RECEIVE_STOCK:
        return merge({}, state, {[action.stock.id]:action.stock});
      case RECEIVE_STOCKS:
        return merge({},action.stocks);
      case RECEIVE_PRICE:
        const newState = merge({},state);
        newState[action.id].price = action.price;
        return newState;
      default:
        return state;
    }
}

export default StocksReducer;
