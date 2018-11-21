json.user do
  json.partial! "api/users/user", user: @user
end

json.watchlist do
  json.partial! "api/watchlists/watchlist", watchlist: @user.watchlist
end
