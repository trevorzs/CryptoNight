# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
users = User.create([{
  username:"Potential_Cryptonaut",
    password:"starwars",
    email:"cryptonaut@gmail.com",
    first_name:"Potential",
    last_name:"Cryptonaut"
  }
  ])

Stock.destroy_all
stocks = Stock.create([{
    name: "Bitcoin",
    symbol: "BTC",
    details: "Bitcoin is bestcoin"
  },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    details: "So money, much coin"
    },
  {
    name: "Ethereum",
    symbol: "ETH",
    details: "Ethereal"
      },
  {
    name: "Stellar",
    symbol: "XLM",
    details: "Shoot for the stars"
    },
  {
    name: "Litecoin",
    symbol: "LTC",
    details: "Not heavy"
    },
  {
    name: "Ripple",
    symbol: "XRP",
    details: "Make waves"
    },
  {
    name: "NEO",
    symbol: "NEO",
    details: "The One"
    },
    {
      name: "Dash",
      symbol: "DASH",
      details: "Fast"
      },
    {
      name: "BitcoinCash",
      symbol: "BCH",
      details: "Cash Money"
      },
      name: "Zcash",
      symbol: "ZEC",
      details: "ZZZZmoney"])
