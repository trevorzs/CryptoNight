import React from 'react';
import {connect} from 'react-redux';
import UserShowPage from './users_show_page';
import {logout} from '../../actions/session_actions';
import {watchlistDataFetch, clearData, altFetchStocks, fetchAllNews, altFetchStocksData} from '../../actions/stocks_actions';
import {doneLoading, needsLoading} from '../../actions/ui_actions';

const msp = state => {
  return (
    {
      loggedIn: Boolean(state.session.id),
      currentUser: state.entities.users[state.session.id],
      watchlist: state.entities.watchlist,
      loading: state.ui.loading,
      stocks: state.entities.stocks,
      news: state.entities.news
    }
  )
};

const mdp = dispatch => (
  {
    logout: () => dispatch(logout()),
    watchlistDataFetch: (syms) => dispatch(watchlistDataFetch(syms)),
    doneLoading: () => dispatch(doneLoading()),
    altFetchStocks: () => dispatch(altFetchStocks()),
    needsLoading: () => dispatch(needsLoading()),
    clearData: ()=> dispatch(clearData()),
    fetchAllNews: (syms) => dispatch(fetchAllNews(syms)),
    altFetchStocksData: (syms) => dispatch(altFetchStocksData(syms))
  }
);


export default connect(msp,mdp)(UserShowPage);
