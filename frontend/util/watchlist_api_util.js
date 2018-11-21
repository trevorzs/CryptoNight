export const addToWatchlist = (watchlistJoin) => {
  return(
    $.ajax({
      url: "api/watchlist_joins",
      method: "POST",
      data: {watchlistJoin}
    })
  )
}

export const removeFromWatchlist = (watchlistJoin) => {
  return(
    $.ajax({
      url: `api/watchlist_joins/`,
      method: "DELETE",
      data: {
        watchlistJoin
      }
    })
  )
}
