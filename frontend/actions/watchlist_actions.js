import * as WatchlistApiUtil from '../util/watchlist_api_util';

export const RECEIVE_WATCHLIST_JOIN = "RECEIVE WATCHLIST_JOIN";

export const receiveWatchlistJoin = (watchlistJoin) => {
  return (
    {
      type: RECEIVE_WATCHLIST_JOIN,
      watchlistJoin
    }
  )
}


export const addToWatchlist = (watchlistJoin) => dispatch => (
  WatchlistApiUtil.addToWatchlist(watchlistJoin).then(watchlistJoin => (
    dispatch(receiveWatchlistJoin(watchlistJoin))
  )
))
