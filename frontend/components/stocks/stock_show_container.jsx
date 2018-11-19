import React from 'react';
import {connect} from 'react-redux';
import StockShow from './stock_show';
import {fetchStock, fetchPrice, queryStocks, clearSearch, clearData} from '../../actions/stocks_actions';
import {logout} from '../../actions/session_actions';

const msp = (state, ownProps) => {
  return (
    {
      stock: state.entities.stocks[ownProps.match.params.stock_id],
      data: state.entities.data,
      search: state.ui.search,
      query: state.ui.query
    }
  )
}


const mdp = dispatch => (
  {
    fetchStock: id => dispatch(fetchStock(id)),
    queryStocks: (query) => dispatch(queryStocks(query)),
    clearSearch: () => dispatch(clearSearch()),
    clearData: ()=> dispatch(clearData()),
    logout: () => dispatch(logout())
  }
);


export default connect(msp,mdp)(StockShow);
