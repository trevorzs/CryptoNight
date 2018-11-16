import {RECEIVE_DONE_LOADING} from '../actions/ui_actions';
import {merge} from 'lodash';

const UiReducer = (state = {loading: true}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_DONE_LOADING:
      return merge({},state,{loading:false});
    default:
      return state;
  }
}

export default UiReducer;
