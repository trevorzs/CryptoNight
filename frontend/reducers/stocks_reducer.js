import {RECEIVE_STOCK, RECEIVE_STOCKS} from '../actions/stocks_actions';
import {merge} from 'lodash';

const StocksReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
      case RECEIVE_STOCK:
        return merge({}, state, {[action.stock.id]:action.stock});
      case RECEIVE_STOCKS:
        return merge({},action.stocks);
      default:
        return state;
    }
}

export default StocksReducer;
