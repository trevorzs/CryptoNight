import React from 'react';
import {connect} from 'react-redux';
import UserShowPage from './users_show_page';
import {logout} from '../../actions/session_actions';
import {watchlistDataFetch, clearData} from '../../actions/stocks_actions';
import {doneLoading, needsLoading} from '../../actions/ui_actions';

const msp = state => {
  return (
    {
      loggedIn: Boolean(state.session.id),
      currentUser: state.entities.users[state.session.id],
      watchlist: state.entities.watchlist[state.session.id],
      loading: state.ui.loading
    }
  )
};

const mdp = dispatch => (
  {
    logout: () => dispatch(logout()),
    watchlistDataFetch: (syms) => dispatch(watchlistDataFetch(syms)),
    doneLoading: () => dispatch(doneLoading()),
    needsLoading: () => dispatch(needsLoading()),
    clearData: ()=> dispatch(clearData()),
  }
);


export default connect(msp,mdp)(UserShowPage);
