import React from 'react';
import {connect} from 'react-redux';
import StockShow from './stock_show';
import {fetchStock, fetchPrice, queryStocks, clearSearch, clearData} from '../../actions/stocks_actions';
import {logout} from '../../actions/session_actions';
import {doneLoading, needsLoading} from '../../actions/ui_actions';
import {addToWatchlist, removeFromWatchlist} from '../../actions/watchlist_actions';

const msp = (state, ownProps) => {
  return (
    {
      stock: state.entities.stocks[ownProps.match.params.stock_id],
      currentUser: state.entities.users[state.session.id],
      watchlist: state.entities.watchlist,
      data: state.entities.data,
      search: state.ui.search,
      query: state.ui.query,
      loading: state.ui.loading
    }
  )
}


const mdp = dispatch => (
  {
    fetchStock: id => dispatch(fetchStock(id)),
    clearSearch: () => dispatch(clearSearch()),
    clearData: ()=> dispatch(clearData()),
    logout: () => dispatch(logout()),
    doneLoading: () => dispatch(doneLoading()),
    needsLoading: () => dispatch(needsLoading()),
    addToWatchlist: (watchlistJoin) => dispatch(addToWatchlist(watchlistJoin)),
    removeFromWatchlist: (watchlistJoin) => dispatch(removeFromWatchlist(watchlistJoin)),

  }
);


export default connect(msp,mdp)(StockShow);
