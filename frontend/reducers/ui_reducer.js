import {RECEIVE_DONE_LOADING, RECEIVE_NEEDS_LOADING} from '../actions/ui_actions';
import {RECEIVE_QUERY, CLEAR_SEARCH} from '../actions/stocks_actions';
import {merge} from 'lodash';

const UiReducer = (state = {loading: true, shares: false}, action) => {
  Object.freeze(state);
  let newState;
  switch (action.type) {
    case RECEIVE_DONE_LOADING:
      return merge({},state,{loading:false});
    case RECEIVE_NEEDS_LOADING:
      return merge({},state,{loading:true});
    case RECEIVE_QUERY:
      const ids = Object.keys(action.stocks);
      newState = merge({},state);
      newState.search = [];
      for (var i = 0; i < ids.length; i++) {
        newState.search.push(action.stocks[ids[i]]);
      }
      newState.query = action.query;
      return newState;
    case CLEAR_SEARCH:
      newState = merge({},state);
      delete newState.search;
      delete newState.query;
      return newState;
    default:
      return state;
  }
}

export default UiReducer;
