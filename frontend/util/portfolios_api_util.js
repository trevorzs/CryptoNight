export const createPortfolio = (portfolio) => {
  return(
    $.ajax({
      url: "api/portfolios",
      method: "POST",
      data: {portfolio}
    })
  )
}

export const fetchPortfolios = () => {
  return(
    $.ajax({
      url: "api/allportfolios",
      method: "GET",
    })
  )
}
