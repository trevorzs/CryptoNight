import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_USER = "RECEIVE_USER";
export const REMOVE_USER = "REMOVE_USER";

export const receiveUser = (user) => (
  {
    type: RECEIVE_USER,
    user
  }
);

export const removeUser = () => (
  {
    type: REMOVE_USER,
  }
);


export const login = (user) => dispatch => (
  SessionApiUtil.login(user).then(
    user => (dispatch(receiveUser(user)))
  )
);

export const signup = (user) => dispatch => (
  SessionApiUtil.signup(user).then(
    user => (dispatch(receiveUser(user)))
  )
);

export const logout = () => dispatch => (
  SessionApiUtil.logout().then(
    () => (dispatch(removeUser()))
  )
);
