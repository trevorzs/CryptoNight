import React from 'react';
import {connect} from 'react-redux';
import StockShow from './stock_show';
import {fetchStock, fetchPrice} from '../../actions/stocks_actions';
import {logout} from '../../actions/session_actions';

const msp = (state, ownProps) => {
  return (
    {
      stock: state.entities.stocks[ownProps.match.params.stock_id],
    }
  )
}


const mdp = dispatch => (
  {
    fetchStock: id => dispatch(fetchStock(id)),
    fetchPrice: (sym,id) => dispatch(fetchPrice(sym,id)),
    logout: () => dispatch(logout())
  }
);


export default connect(msp,mdp)(StockShow);
