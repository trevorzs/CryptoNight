import {RECEIVE_USER} from '../actions/session_actions';
import {RECEIVE_TRANSACTION} from '../actions/transaction_actions';
import {merge} from 'lodash';

const UsersReducer = (state = {}, action) => {
    let newState;
    Object.freeze(state);
    switch (action.type) {
      case RECEIVE_USER:
        return merge({}, state, {[action.user.id]:action.user})
      default:
        return state;
    }
}

export default UsersReducer;
