import {RECEIVE_PORTFOLIOS, RECEIVE_PORTFOLIO} from '../actions/portfolio_actions';
import {merge} from 'lodash';

const PortfolioReducer = (state = [], action) => {
    Object.freeze(state);
    let newState, date, newobj;
    switch (action.type) {
      case RECEIVE_PORTFOLIOS:
        newState = action.portfolios.slice();
        for (var i = 0; i < newState.length; i++) {
          date = new Date(newState[i].created_at);
          newState[i].created_at = Math.round((date.getTime()));
        }
        return newState;
      case RECEIVE_PORTFOLIO:
        newState = state.slice();
        date = new Date(action.portfolio.created_at);
        newobj = Object.assign({},action.portfolio);
        newobj.created_at = Math.round((date.getTime()));
        newState.push(newobj);
        return newState;
      default:
        return state;
    }
}

export default PortfolioReducer;
