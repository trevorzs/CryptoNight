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
