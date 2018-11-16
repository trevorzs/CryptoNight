import React from 'react';
import {connect} from 'react-redux';
import StockIndex from './stock_index';
import {fetchStocks, fetchStocksData} from '../../actions/stocks_actions';
import {logout} from '../../actions/session_actions';

const msp = (state, ownProps) => {
  const ids = Object.keys(state.entities.stocks)
  return({
    stocks: ids.map(id=>(
      state.entities.stocks[id]
    )),
    symbols: ids.map(id=>[state.entities.stocks[id].symbol,id]).slice(0,-1)
  })
}

const mdp = dispatch => (
  {
    fetchStocks: () => dispatch(fetchStocks()),
    updateStocks: (symbols) => dispatch(fetchStocksData(symbols)),
    logout: () => dispatch(logout())
  }
);


export default connect(msp,mdp)(StockIndex);
