import React from 'react';
import {connect} from 'react-redux';
import Navbar from './navbar';
import {fetchStock, fetchPrice, queryStocks, clearSearch, clearData} from '../../actions/stocks_actions';
import {logout} from '../../actions/session_actions';

const msp = (state, ownProps) => {
  return (
    {
      search: state.ui.search,
      query: state.ui.query
    }
  )
}


const mdp = dispatch => (
  {
    queryStocks: (query) => dispatch(queryStocks(query)),
    clearSearch: () => dispatch(clearSearch()),
    logout: () => dispatch(logout())
  }
);


export default connect(msp,mdp)(Navbar);
