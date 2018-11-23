export const addTransaction = (transaction,user) => {
  return(
    $.ajax({
      url: "api/transactions",
      method: "POST",
      data: {transaction}
    })
  )
}

export const findShares = (user_id, stock_id) => {
  return(
    $.ajax({
      url: 'api/shares',
      method: "GET",
      data: {
        user_id,
        stock_id
      }
    })
  )
}

export const findAllShares = (user_id) => {
  return(
    $.ajax({
      url: 'api/allshares',
      method: "GET",
      data: {
        user_id
      }
    })
  )
}
