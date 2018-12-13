import {RECEIVE_TRANSACTION, RECEIVE_ALL_SHARES, RECEIVE_SHARES, CLEAR_DATA} from '../actions/transaction_actions';
import {RECEIVE_USER} from '../actions/session_actions';
import {RECEIVE_NEEDS_LOADING} from '../actions/ui_actions';
import {merge} from 'lodash';

const SharesReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
      case RECEIVE_TRANSACTION:
      newState = merge({},state);
      if (newState[action.transaction.stock_id]){
        newState[action.transaction.stock_id] += action.transaction.amount;
      }
      else{
          newState[action.transaction.stock_id] = action.transaction.amount;
      }
      if (newState[action.transaction.stock_id] <= 0){
        delete newState[action.transaction.stock_id]
      }
      return newState;
      case RECEIVE_ALL_SHARES:
        return merge({},state,action.shares);
      case RECEIVE_SHARES:
        return merge({},state,action.shares);
      case RECEIVE_USER:
      case CLEAR_DATA:
        return {};
      case RECEIVE_NEEDS_LOADING:
        return {};
      default:
        return state;
    }
}

export default SharesReducer;
