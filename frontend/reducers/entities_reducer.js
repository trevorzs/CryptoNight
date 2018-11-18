import {combineReducers} from 'redux';
import UsersReducer from './users_reducer';
import StocksReducer from './stocks_reducer';
import DataReducer from './data_reducer';

export default combineReducers({
  users: UsersReducer,
  stocks: StocksReducer,
  data: DataReducer
});
