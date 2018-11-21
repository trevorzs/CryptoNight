import React from 'react';
import {connect} from 'react-redux';
import Watchlist from './watchlist';
import {logout} from '../../actions/session_actions';

const msp = state => {
  return (
    {
      loggedIn: Boolean(state.session.id),
      currentUser: state.entities.users[state.session.id],
      currentUserWatchlist: state.entities.users[state.session.id].watchlist
    }
  )
};

const mdp = dispatch => (
  {
    logout: () => dispatch(logout())
  }
);


export default connect(msp,mdp)(Watchlist);
