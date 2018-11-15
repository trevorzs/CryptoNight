import React from 'react';
import {connect} from 'react-redux';
import StockIndex from './stock_index';
import {fetchStocks} from '../../actions/stocks_actions';
import {logout} from '../../actions/session_actions';

const msp = (state, ownProps) => {
  return({
    stocks: Object.keys(state.entities.stocks).map(id=>(
      state.entities.stocks[id]
    ))
  })
}

const mdp = dispatch => (
  {
    fetchStocks: () => dispatch(fetchStocks()),
    logout: () => dispatch(logout())
  }
);


export default connect(msp,mdp)(StockIndex);
