import React from 'react';
import {connect} from 'react-redux';
import TransactionForm from './transaction_form';
import {addTransaction} from '../../actions/transaction_actions';
import {fetchPrice} from '../../actions/stocks_actions';
import {findShares} from '../../actions/transaction_actions';

const msp = (state, ownProps) => {
  return({
    currentUser: state.entities.users[state.session.id],
    data: state.entities.data,
    share: state.entities.shares
  })
}

const mdp = dispatch => (
  {
    addTransaction: (transaction,user) => dispatch(addTransaction(transaction,user)),
    fetchPrice: (sym,id) => dispatch(fetchPrice(sym,id)),
    findShares: (user_id,stock_id) => dispatch(findShares(user_id,stock_id))
  }
);


export default connect(msp,mdp)(TransactionForm);
