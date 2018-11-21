# json.stocks do
#   json.extract! watchlist, :watchlistJoins
# end
#
# json.watchlistjoins do
#   json.set! watchlist.user_id do
#     json.extract! watchlist, :id, :user_id
#   end
# end

json.extract! watchlist, :user_id, :id, :stocks, :watchlistJoins
