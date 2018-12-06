# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Watchlist.destroy_all
WatchlistJoin.destroy_all
Transaction.destroy_all
User.destroy_all
PortfolioHistory.destroy_all
Portfolio.destroy_all
users = User.create!([{
  username:"Potential_Cryptonaut",
    password:"starwars",
    email:"cryptonaut@gmail.com",
    first_name:"Potential",
    last_name:"Cryptonaut",
    funds: 0
  }
  ])

Stock.destroy_all
stocks = Stock.create!([{
    name: "Bitcoin",
    symbol: "BTC",
    details: "Bitcoin is bestcoin",
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
      {
      name: "Zcash",
      symbol: "ZEC",
      details: "ZZZZmoney"},
      {
        name: "Bitcoin Gold",
        symbol: "BTG",
        details: "Bagic the Gathering"
        },
      {
        name: "Monero",
        symbol: "XMR",
        details: "Show me the monero"
        },
      {
        name: "Ethereum Classic",
        symbol: "ETC",
        details: "Clasically ethereal"
        },
      {
        name: "Qtum",
        symbol: "QTUM",
        details: "Quantum"
      },
      {
        name: "Lisk",
        symbol: "LSK",
        details: "He talks with a lisk"
        },
      {
        name: "Particl",
        symbol: "PART",
        details: "Particularly cool"
        },
      {
        name: "Cardano",
        symbol: "ADA",
        details: "Made in Hong Kong"
        },
      {
        name: "TRON",
        symbol: "TRX",
        details: "Cyber"
        },
      {
        name: "Binance Coin",
        symbol: "BNB",
        details: "Buy now"
        },
      {
        name: "OX",
        symbol: "ZRX",
        details: "Moo"
        },
      {
        name: "Ontology",
        symbol: "ONT",
        details: "Made in Hong Kong"
        },
        {
          name: "Zilliqa",
          symbol: "ZIL",
          details: "Zillionaire"
          },
        {
          name: "Aeternity",
          symbol: "AE",
          details: "Forever"
          },
          {
            name: "Populous",
            symbol: "PPT",
            details: "Crowded"
            },
          {
            name: "Waves",
            symbol: "WAVES",
            details: "Splash"
            },
          {
            name: "Augur",
            symbol: "REP",
            details: "Made in Hong Kong"
            },
          {
            name: "Tether",
            symbol: "USDT",
            details: "Tethered together"
            },
            {
              name: "True USD",
              symbol: "TUSD",
              details: "Truly American"
              },
            {
              name: "Golem Network Token",
              symbol: "GNT",
              details: "My precious"
              },
            {
              name: "Bitcoin Cash Satoshi's Vision",
              symbol: "BCHSV",
              details: "All hail satoshi"
              },
            {
              name: "Bitshares",
              symbol: "BTS",
              details: "Bite sized shares"
              },
            {
              name: "Crypto.com",
              symbol: "MCO",
              details: "Dot com"
              },
            {
              name: "Hshare",
              symbol: "HSR",
              details: "The letter H"
              },
              {
                name: "Okex",
                symbol: "OKB",
                details: "Ok rolex"
                },
              {
                name: "Paxos Standard",
                symbol: "PAX",
                details: "pax"
                },
              {
                name: "GXChain",
                symbol: "GXS",
                details: "Spectacular"
                },
              {
                name: "IOTA",
                symbol: "IOT",
                details: "Tiny"
                },
                {
                  name: "Huobi Token",
                  symbol: "HT",
                  details: "Mr. Huobi"
                  },
                {
                  name: "GIFTO",
                  symbol: "GTO",
                  details: "Present"
                  },
                {
                  name: "Nuls",
                  symbol: "NULS",
                  details: "and void"
                  },
                {
                  name: "Infinity Economics",
                  symbol: "XIN",
                  details: "and beyond"
                  },
                {
                  name: "Mithril",
                  symbol: "MITH",
                  details: "Stronger than steel"
                  },
                {
                  name: "Decred",
                  symbol: "DCR",
                  details: "creed"
                  },
                {
                  name: "Factoids",
                  symbol: "FCT",
                  details: "fax"
                  },
                {
                  name: "Elastos",
                  symbol: "ELA",
                  details: "Elastica"
                  },
                {
                  name: "Tezos",
                  symbol: "XTZ",
                  details: "Ecstatic"
                  }])
  Transaction.create!([{
      user_id: User.find_by(username: "Potential_Cryptonaut").id,
      stock_id: Stock.find_by(symbol: "BTC").id,
      price: 4444,
      amount:3
    }])
    WatchlistJoin.create!([{
        watchlist_id: User.find_by(username: "Potential_Cryptonaut").watchlist.id,
        stock_id: Stock.find_by(symbol: "BTC").id,
      }])
    PortfolioHistory.create!([{
      user_id: User.find_by(username: "Potential_Cryptonaut").id
      }])
