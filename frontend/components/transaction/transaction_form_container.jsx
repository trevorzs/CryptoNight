import React from 'react';
import {connect} from 'react-redux';
import TransactionForm from './transaction_form';
import {addTransaction} from '../../actions/transaction_actions';
import {createPortfolio} from '../../actions/portfolio_actions';
import {fetchPrice} from '../../actions/stocks_actions';
import {findAllShares} from '../../actions/transaction_actions';

const msp = (state, ownProps) => {
  return({
    currentUser: state.entities.users[state.session.id],
    data: state.entities.data,
    shares: state.entities.shares
  })
}

const mdp = dispatch => (
  {
    addTransaction: (transaction,user) => dispatch(addTransaction(transaction,user)),
    createPortfolio: (portfolio) => dispatch(createPortfolio(portfolio)),
    fetchPrice: (sym,id) => dispatch(fetchPrice(sym,id)),
    findAllShares: (user_id) => dispatch(findAllShares(user_id))
  }
);


export default connect(msp,mdp)(TransactionForm);
