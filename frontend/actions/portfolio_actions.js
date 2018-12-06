import * as PortfoliosApiUtil from '../util/portfolios_api_util';

export const RECEIVE_PORTFOLIO = "RECEIVE_PORTFOLIO";


export const receivePortfolio = (portfolio) =>{
  return(
    {
      type: RECEIVE_PORTFOLIO,
      portfolio
    }
  )
}

export const createPortfolio = (portfolio) => dispatch => (
  PortfoliosApiUtil.createPortfolio(portfolio).then(portfolio => (
    dispatch(receivePortfolio(portfolio)))
  )
);
