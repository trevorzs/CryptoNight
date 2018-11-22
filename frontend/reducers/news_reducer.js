import {RECEIVE_NEWS, CLEAR_DATA, RECEIVE_STOCK_DATA} from '../actions/stocks_actions';
import {merge} from 'lodash';

const NewsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
      case RECEIVE_NEWS:
        return action.news.Data;
      case RECEIVE_STOCK_DATA:
        return action.data.news;
      case CLEAR_DATA:
        return [];
      default:
        return state;
    }
}

export default NewsReducer;
