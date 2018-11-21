import {RECEIVE_USER} from '../actions/session_actions';
import {RECEIVE_WATCHLIST_JOIN} from '../actions/watchlist_actions';
import {RECEIVE_WATCHLIST_DATA} from '../actions/stocks_actions';
import {merge} from 'lodash';

const WatchlistsReducer = (state = [], action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
      case RECEIVE_USER:
        return action.watchlist.stocks.map((stock)=>(
          stock.id
        ));
      case RECEIVE_WATCHLIST_JOIN:
        newState = state.slice();
        newState.push(action.watchlistJoin.stock_id);
        return newState;
      case RECEIVE_WATCHLIST_DATA:
        return action.ids;
      default:
        return state;
    }
}

export default WatchlistsReducer;
