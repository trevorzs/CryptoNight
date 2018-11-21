export const addToWatchlist = (watchlistJoin) => {
  return(
    $.ajax({
      url: "api/watchlist_joins",
      method: "POST",
      data: {watchlistJoin}
    })
  )
}

export const removeFromWatchlist = (id) => {
  return(
    $.ajax({
      url: `api/watchlist_joins/${id}`,
      method: "DELETE",
    })
  )
}