import {RECEIVE_USER} from '../actions/session_actions';
import {RECEIVE_WATCHLIST_JOIN} from '../actions/watchlist_actions';
import {RECEIVE_WATCHLIST_DATA} from '../actions/stocks_actions';
import {merge} from 'lodash';

const WatchlistsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
      case RECEIVE_USER:
        newState = merge({},state);
        newState[action.watchlist.user_id] = action.watchlist;
        return newState;
      case RECEIVE_WATCHLIST_DATA:
        newState = merge({},state);
        const arr = Object.keys(action.obj.stocks).map((sym,i)=>{
          newState.news = action.obj.news;
          return(
            merge(state[currentUserWatchlist.id].stocks[i],action.obj.stocks[sym])
          )
          });
        newState[currentUserWatchlist.id].stocks = arr;
        return newState;
      default:
        return state;
    }
}

export default WatchlistsReducer;
