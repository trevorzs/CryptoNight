import React from 'react';
import {connect} from 'react-redux';
import Watchlist from './watchlist';
import {logout} from '../../actions/session_actions';

const msp = state => {
  return (
    {
    }
  )
};

const mdp = dispatch => (
  {
  }
);


export default connect(msp,mdp)(Watchlist);
