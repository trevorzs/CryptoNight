import * as TransactionApiUtil from '../util/transaction_api_util';
import {updateUser} from './users_actions';

export const RECEIVE_TRANSACTION = "RECEIVE_TRANSACTION";
export const RECEIVE_SHARES = "RECEIVE_SHARES";
export const RECEIVE_ALL_SHARES = "RECEIVE_ALL_SHARES";

export const receiveTransaction = (transaction) =>{
  return(
    {
      type: RECEIVE_TRANSACTION,
      transaction
    }
  )
}

export const receiveShares = (shares) => {
  return (
    {
      type: RECEIVE_SHARES,
      shares
    }
  )
}

export const receiveAllShares = (shares) => {
  return (
    {
      type: RECEIVE_ALL_SHARES,
      shares
    }
  )
}

export const addTransaction = (transaction,user) => dispatch => {
  return(
  TransactionApiUtil.addTransaction(transaction).then(transaction => {
    return(dispatch(receiveTransaction(transaction)))
  }
)).then(response =>{
      const newUser = Object.assign({},user);
      newUser.funds -= (response.transaction.price*response.transaction.amount)
      return (
        dispatch(updateUser(newUser))
      )
    }
  );}


export const findShares = (user_id, stock_id) =>dispatch => (
  TransactionApiUtil.findShares(user_id, stock_id).then(response=>{
    return(
      dispatch(receiveShares(response))
    )
  })
)

export const findAllShares = (user_id) => dispatch => {
  return(
  TransactionApiUtil.findAllShares(user_id).then(response=>{
    return(
      dispatch(receiveAllShares(response))
    )
  }
)
  )
}
