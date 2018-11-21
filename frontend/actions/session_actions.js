import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_USER = "RECEIVE_USER";
export const REMOVE_USER = "REMOVE_USER";
export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const receiveUser = ({user, watchlist}) => (
  {
    type: RECEIVE_USER,
    user,
    watchlist
  }
);

export const removeUser = () => (
  {
    type: REMOVE_USER,
  }
);

export const receiveErrors = (errors) => (
  {
    type: RECEIVE_ERRORS,
    errors
  }
)

export const clearErrors = () => (
  {
    type: CLEAR_ERRORS
  }
)

export const login = (user) => dispatch => (
  SessionApiUtil.login(user).then(payload => (
    dispatch(receiveUser(payload))
  ), err => (
    dispatch(receiveErrors(err.responseJSON))
  ))
);

export const signup = (user) => dispatch => (
  SessionApiUtil.signup(user).then(user => (
      dispatch(receiveUser(user))
    ),
    err => (
      dispatch(receiveErrors(err.responseJSON))
    )
  )
);

export const logout = () => dispatch => (
  SessionApiUtil.logout().then(
    () => (dispatch(removeUser()))
  )
);
