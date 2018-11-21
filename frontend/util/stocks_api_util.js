export const fetchStocks = () => (
  $.ajax({
    url: "api/stocks",
    method: "GET",
  })
);

export const queryStocks = (query) => (
  $.ajax({
    url: `api/stocks/search/${query}`,
    method: "GET"
  })
)

export const fetchStock = (id) => (
  $.ajax({
    url: `api/stocks/${id}`,
    method: "GET"
  })
)

export const fetchPrice = (sym) => (
  $.ajax({
    url: `https://min-api.cryptocompare.com/data/price?fsym=${sym}&tsyms=USD`,
    method: "GET",
    data: {
      'api-key': "9bebfd466b7d5409ee6d7e812ae3b3f32d32f455dacb0b17f4058565ab5001c0"
    }
  })
)

export const fetchStocksData = (symbols) => {
  const syms = symbols.map((arr)=>(arr[0])).join(",");

  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${syms}&tsyms=USD`,
      method: "GET",
      data: {
        'api-key': "9bebfd466b7d5409ee6d7e812ae3b3f32d32f455dacb0b17f4058565ab5001c0"
      }
    })
  )
}

export const fetchStockDaily = (sym) => {
  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/histominute?fsym=${sym}&tsym=USD&limit=1441`,
      method: "GET",
      data: {
        'api-key': "9bebfd466b7d5409ee6d7e812ae3b3f32d32f455dacb0b17f4058565ab5001c0"
      }
    })
  )
}

export const altFetchStockDaily = (sym) => {
  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/histohour?fsym=${sym}&tsym=USD&limit=25`,
      method: "GET",
      data: {
        'api-key': "9bebfd466b7d5409ee6d7e812ae3b3f32d32f455dacb0b17f4058565ab5001c0"
      }
    })
  )
}

export const fetchStockWeekly = (sym) => {
  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/histohour?fsym=${sym}&tsym=USD&limit=169`,
      method: "GET",
      data: {
        'api-key': "9bebfd466b7d5409ee6d7e812ae3b3f32d32f455dacb0b17f4058565ab5001c0"
      }
    })
  )
}

export const fetchStockMonthly = (sym) => {
  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/histoday?fsym=${sym}&tsym=USD&limit=31`,
      method: "GET",
      data: {
        'api-key': "9bebfd466b7d5409ee6d7e812ae3b3f32d32f455dacb0b17f4058565ab5001c0"
      }
    })
  )
}

export const fetchStockTriMonthly = (sym) => {
  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/histoday?fsym=${sym}&tsym=USD&limit=93`,
      method: "GET",
      data: {
        'api-key': "9bebfd466b7d5409ee6d7e812ae3b3f32d32f455dacb0b17f4058565ab5001c0"
      }
    })
  )
}


export const fetchStockYearly = (sym) => {
  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/histoday?fsym=${sym}&tsym=USD&limit=365`,
      method: "GET",
      data: {
        'api-key': "9bebfd466b7d5409ee6d7e812ae3b3f32d32f455dacb0b17f4058565ab5001c0"
      }
    })
  )
}

export const fetchStockFiveYearly = (sym) => {
  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/histoday?fsym=${sym}&tsym=USD&limit=1825`,
      method: "GET",
      data: {
        'api-key': "9bebfd466b7d5409ee6d7e812ae3b3f32d32f455dacb0b17f4058565ab5001c0"
      }
    })
  )
}

export const fetchAllNews = (syms) => {
  let symbols = syms.map((sym) => {
    if (sym.length < 3){
      return "Blockchain"
    }else{
      return sym
    }
  })
  symbols = symbols.join(",");
  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/v2/news/?categories=${symbols}&excludeCategories=Sponsored`,
      method: "GET",
      data: {
        'api-key': "9bebfd466b7d5409ee6d7e812ae3b3f32d32f455dacb0b17f4058565ab5001c0"
      }
    })
  )
}

export const fetchNews = (sym) => {
  if (sym.length<3){
    sym = "Blockchain"
  }
  return (
    $.ajax({
      url: `https://min-api.cryptocompare.com/data/v2/news/?categories=${sym}&excludeCategories=Sponsored`,
      method: "GET",
      data: {
        'api-key': "9bebfd466b7d5409ee6d7e812ae3b3f32d32f455dacb0b17f4058565ab5001c0"
      }
    })
  )
}
