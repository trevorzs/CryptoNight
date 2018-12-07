json.array! @portfolios do |portfolio|
  json.extract! portfolio, :created_at, :account_value
end
