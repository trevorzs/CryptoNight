export const createPortfolio = (portfolio) => {
  return(
    $.ajax({
      url: "api/portfolios",
      method: "POST",
      data: {portfolio}
    })
  )
}
