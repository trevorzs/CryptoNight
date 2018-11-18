export const fetchStocks = () => (
  $.ajax({
    url: "api/stocks",
    method: "GET",
  })
);

export const fetchStock = (id) => (
  $.ajax({
    url: `api/stocks/${id}`,
    method: "GET"
  })
)

export const fetchPrice = (sym) => (
  $.ajax({
    url: `https://min-api.cryptocompare.com/data/price?fsym=${sym}&tsyms=USD`,
    method: "GET"
  })
)

export const fetchStocksData = (symbols) => {
  const syms = symbols.map((arr)=>(arr[0])).join(",")
  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${syms}&tsyms=USD`,
      method: "GET"
    })
  )
}

export const fetchStockDaily = (sym) => {
  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/histohour?fsym=${sym}&tsym=USD&limit=24`,
      method: "GET"
    })
  )
}

export const fetchStockWeekly = (sym) => {
  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/histoday?fsym=${sym}&tsym=USD&limit=7`,
      method: "GET"
    })
  )
}

export const fetchStockMonthly = (sym) => {
  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/histoday?fsym=${sym}&tsym=USD&limit=31`,
      method: "GET"
    })
  )
}


export const fetchStockYearly = (sym) => {
  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/histoday?fsym=${sym}&tsym=USD&limit=365`,
      method: "GET"
    })
  )
}

export const fetchStockFiveYearly = (sym) => {
  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/histoday?fsym=${sym}&tsym=USD&limit=1825`,
      method: "GET"
    })
  )
}

export const fetchNews = (sym) => {
  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/v2/news/?categories=${sym}&excludeCategories=Sponsored`,
      method: "GET"
    })
  )
}
