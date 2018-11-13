import {RECEIVE_USER, REMOVE_USER} from '../actions/session_actions';
import {merge} from 'lodash';

const SessionReducer = (state = {id:null}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USER:
      return {id: action.user.id}
    case REMOVE_USER:
      return {id:null}
    default:
      return state;
  }
}

export default SessionReducer;
