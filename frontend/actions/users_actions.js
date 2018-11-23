import * as UsersApiUtil from '../util/users_api_util';

export const RECEIVE_UPDATED_USER = "RECEIVE_UPDATED_USER";


export const receiveUpdatedUser = (user) =>{
  return(
    {
      type: RECEIVE_UPDATED_USER,
      user
    }
  )
}
export const updateUser = (user) => dispatch => (
  UsersApiUtil.updateUser(user).then(user => (
    dispatch(receiveUpdatedUser(user))
  )
))
