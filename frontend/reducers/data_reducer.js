import {RECEIVE_STOCK_DATA, RECEIVE_STOCKS, CLEAR_DATA, RECEIVE_PRICE} from '../actions/stocks_actions';
import {merge} from 'lodash';

const DataReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState;
  let ids;
  switch (action.type) {
    case RECEIVE_STOCK_DATA:
      let sum = 0;
      let newObj = merge({},state);
      let arr = [];
      let item, initial;
      initial = action.data.monthly[0].open;
      for (var i = 0; i < action.data.monthly.length; i++) {
        item = action.data.monthly[i];
        sum += (item.close - item.open);
        arr.push(merge(item,{change: sum, pctchange: (sum/initial)*100 }));
      }
      newObj.monthly = arr;
      initial = action.data.daily[0].open;
      arr = [];
      sum = 0;
      for (var i = 1; i < action.data.daily.length; i++) {
        item = action.data.daily[i];
        sum += (item.close - action.data.daily[i-1].close);
        arr.push(merge(item,{change: sum, pctchange: (sum/initial)*100 }));
      }
      newObj.daily = arr;
      initial = action.data.weekly[0].open;
      arr = [];
      sum = 0;
      for (var i = 0; i < action.data.weekly.length; i++) {
        item = action.data.weekly[i];
        sum += (item.close - item.open);
        arr.push(merge(item,{change: sum, pctchange: (sum/initial)*100 }));
      }
      newObj.weekly = arr;
      initial = action.data.yearly[0].open;
      arr = [];
      sum = 0;
      for (var i = 0; i < action.data.yearly.length; i++) {
        item = action.data.yearly[i];
        sum += (item.close - item.open);
        arr.push(merge(item,{change: sum, pctchange: (sum/initial)*100 }));
      }
      newObj.yearly = arr;
      initial = action.data.trimonthly[0].open;
      arr = [];
      sum = 0;
      for (var i = 0; i < action.data.trimonthly.length; i++) {
        item = action.data.trimonthly[i];
        sum += (item.close - item.open);
        arr.push(merge(item,{change: sum, pctchange: (sum/initial)*100 }));
      }
      newObj.trimonthly = arr;
      initial = action.data.fiveyearly[0].open;
      arr = [];
      sum = 0;
      for (var i = 0; i < action.data.fiveyearly.length; i++) {
        if (initial === 0){
          initial = action.data.fiveyearly[i].open;
        }
        item = action.data.fiveyearly[i];
        sum += (item.close - item.open);
        arr.push(merge(item,{change: sum, pctchange: (sum/initial)*100 }));
      }
      newObj.fiveyearly = arr;
      newObj.symbols = [];
      return newObj;
    case RECEIVE_STOCKS:
      newState = merge({},state);
      ids = Object.keys(action.stocks);
      newState.symbols=[];
      for (var i = 0; i < ids.length; i++) {
        newState.symbols.push([action.symbols[i],ids[i]])
      }
      return newState;
    case RECEIVE_PRICE:
      newState = merge({},state);
      newState.price = action.price;
      return newState;
    case CLEAR_DATA:
      return {};
    default:
      return state;
  }
}

export default DataReducer;
