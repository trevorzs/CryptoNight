import {RECEIVE_PORTFOLIOS, RECEIVE_PORTFOLIO} from '../actions/portfolio_actions';
import {merge} from 'lodash';

const PortfolioReducer = (state = [], action) => {
    Object.freeze(state);
    let newState;
    switch (action.type) {
      case RECEIVE_PORTFOLIOS:
        return action.portfolios;
      case RECEIVE_PORTFOLIO:
        newState = state.slice();
        newState.push(action.portfolio);
        return newState;
      default:
        return state;
    }
}

export default PortfolioReducer;
