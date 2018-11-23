import {RECEIVE_USER} from '../actions/session_actions';
import {RECEIVE_TRANSACTION} from '../actions/transaction_actions';
import {RECEIVE_UPDATED_USER} from '../actions/users_actions';
import {merge} from 'lodash';

const UsersReducer = (state = {}, action) => {
    let newState;
    Object.freeze(state);
    switch (action.type) {
      case RECEIVE_USER:
        return merge({}, state, {[action.user.id]:action.user})
      case RECEIVE_UPDATED_USER:
        newState = merge({},state);
        newState[action.user.user.id] = action.user.user;
        return newState;
      default:
        return state;
    }
}

export default UsersReducer;
