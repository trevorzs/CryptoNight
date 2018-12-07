import {RECEIVE_TRANSACTIONS} from '../actions/transaction_actions';
import {RECEIVE_USER} from '../actions/session_actions';
import {merge} from 'lodash';

const TransactionReducer = (state = [], action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
      case RECEIVE_TRANSACTIONS:
      let transaction, lastTransaction;
      action.transactions[0].funds = 0;
      action.transactions[0].total = action.transactions[0].amount*action.transactions[0].price;
      for (var i = 1; i < action.transactions.length; i++) {
        transaction = action.transactions[i];
        lastTransaction = action.transactions[i-1];
        transaction.funds = lastTransaction.funds - transaction.amount*transaction.price;
      }
      return action.transactions;
      case RECEIVE_USER:
        return [];
      default:
        return state;
    }
}

export default TransactionReducer;
