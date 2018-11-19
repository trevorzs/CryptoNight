import React from 'react';
import {connect} from 'react-redux';
import StockShow from './stock_show';
import {fetchStock, fetchPrice, requestStocks} from '../../actions/stocks_actions';
import {logout} from '../../actions/session_actions';

const msp = (state, ownProps) => {
  return (
    {
      stock: state.entities.stocks[ownProps.match.params.stock_id],
      data: state.entities.data,
      stocks: state.entities.stocks
    }
  )
}


const mdp = dispatch => (
  {
    fetchStock: id => dispatch(fetchStock(id)),
    requestStocks: () => dispatch(requestStocks()),
    logout: () => dispatch(logout())
  }
);


export default connect(msp,mdp)(StockShow);
