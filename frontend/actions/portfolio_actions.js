import * as PortfoliosApiUtil from '../util/portfolios_api_util';

export const RECEIVE_PORTFOLIO = "RECEIVE_PORTFOLIO";
export const RECEIVE_PORTFOLIOS = "RECEIVE_PORTFOLIOS";


export const receivePortfolio = (portfolio) =>{
  return(
    {
      type: RECEIVE_PORTFOLIO,
      portfolio
    }
  )
}

export const receivePortfolios = (portfolios) => {
  return(
    {
      type: RECEIVE_PORTFOLIOS,
      portfolios
    }
  )
}

export const createPortfolio = (portfolio) => dispatch => (
  PortfoliosApiUtil.createPortfolio(portfolio).then(portfolio => {
    return (
      dispatch(receivePortfolio(portfolio))
    )
  }));

export const fetchPortfolios = () => dispatch => (
  PortfoliosApiUtil.fetchPortfolios().then(portfolios => {
    return (
      dispatch(receivePortfolios(portfolios))
    )
  })
)
