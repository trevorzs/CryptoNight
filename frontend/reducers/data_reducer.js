import {RECEIVE_STOCK_DATA, RECEIVE_STOCKS} from '../actions/stocks_actions';
import {merge} from 'lodash';

const DataReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  let ids;
  switch (action.type) {
    case RECEIVE_STOCK_DATA:
      let sum = 0;
      let newObj = merge({},action.data);
      let arr = [];
      let item;
      for (var i = 0; i < action.data.monthly.length; i++) {
        item = action.data.monthly[i];
        sum += (item.close - item.open);
        arr.push(merge(item,{change: sum, pctchange: (sum/item.open)*100 }));
      }
      newObj.monthly = arr;
      arr = [];
      for (var i = 0; i < action.data.daily.length; i++) {
        item = action.data.daily[i];
        sum += (item.close - item.open);
        arr.push(merge(item,{change: sum, pctchange: (sum/item.open)*100 }));
      }
      newObj.daily = arr;
      arr = [];
      for (var i = 0; i < action.data.weekly.length; i++) {
        item = action.data.weekly[i];
        sum += (item.close - item.open);
        arr.push(merge(item,{change: sum, pctchange: (sum/item.open)*100 }));
      }
      newObj.weekly = arr;
      arr = [];
      for (var i = 0; i < action.data.yearly.length; i++) {
        item = action.data.yearly[i];
        sum += (item.close - item.open);
        arr.push(merge(item,{change: sum, pctchange: (sum/item.open)*100 }));
      }
      newObj.yearly = arr;
      return newObj;
    case RECEIVE_STOCKS:
      newState = merge({},state);
      ids = Object.keys(action.stocks);
      newState.symbols=[];
      for (var i = 0; i < ids.length; i++) {
        newState.symbols.push([action.symbols[i],ids[i]])
      }
      return newState;
    default:
      return state;
  }
}

export default DataReducer;
