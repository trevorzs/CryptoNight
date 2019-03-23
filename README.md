# README
## CryptoNight
[Live Site](https://crypto-night.herokuapp.com)

![screenshot](readme_images/screenshot1.png)

## About
This project is a full-stack, single-page Cryptocurrency investment app inspired by Robinhood Crypto, and contains design elements from both Robinhood and Robinhood Crypto.

## Technologies
React/Redux front-end

Ruby on Rails backend with PostgreSQL database

Recharts library for data graphing

Cryptocompare API

HTML5 and CSS3 for styling

## Features and Implementation
#### Cryptocurrencies index & sorting
![index](readme_images/cryptoindex.png)
Sends request to Rails backend in order to find list of cryptocurrencies available in database. Concatenates all cryptocurrencies' symbols and fires off one blanket Ajax request for all currencies' price data to cryptocompare API. Does this on an interval of 10 seconds, fetching live prices from the API as often as allowed.

Using local state to toggle the four parameter headings (Name, Symbol, Price, Today), toggles styling and onClick functions for each. OnClick fires off an action that sorts entire list by given parameter. This sorting does not interfere with the interval set and prices will continue live updating.

Useful for parsing cryptocurrencies by overall price or see which ones are rising and falling the fastest. Cryptocurrencies can be added to the list by simply adding to the ```Stocks``` table a cryptocurrency object with a 3 letter symbol.

#### Search by crypto name/symbol
![search](readme_images/searchbar.png)
Implemented a searchbar that queries database on either matching symbol or cryptocurrency name. Iterates over search results and toggles styling depending on matching letters entered, mimicking Robinhood searchbar. This results in intuitive and responsive UX.

Future todos include debouncing in order to minimize querying.

#### Cryptocurrency historical data chart
![stock show](readme_images/stockshowdown.png)
Chains multiple Ajax requests to cryptocompare API to obtain the different timescales of historical data for the visited cryptocurrency. Utilizes Recharts react library to display the data in a visually appealing chart. Timescales can be toggled, switching out the dataset.

The entire page's theme, including link styling and background gradient, are toggled based on the active timescale's trend, with help from React's state change re-rendering. For example, if Bitcoin has decreased in the past 24 hours, the 1D timescale will have a dark purple color scheme. If 5Y is clicked, and Bitcoin has an upwards trend, the color theme will be swapped out for a light green instead.
![stock show](readme_images/stockshowup.png)

#### Cryptocurrency related news
Fires off an Ajax request to cryptocompare API to fetch related news based on visited cryptocurrencies' symbol. Iterates over the listings and displays them as links with calculations to display how long ago the news article was published.
![watchlist](readme_images/news.png)

#### Buy/Sell Cryptocurrency
Transactions are held in the ```Transactions``` table. Users can make transactions if they have enough funds to. Users on the ```Users``` table have a funds attribute. On signup, a transaction is created giving a new user one Bitcoin. The user can sell this Bitcoin in a transaction in order to receive funds to make other purchases and trades.

Estimated cost is displayed in the buy/sell table. This is linked to the fetched stock price and is fetched on an interval of 10 seconds. This means that all transactions are based on live market data up to 10 second accuracy, so users can simulate real cryptocurrency trading.

Toggling buy/sell changes the amount in the transaction from a positive number to a negative number. Shares are calculated by summing up all transactions in a user's transaction history.
![buy](readme_images/buy.png)

![sell](readme_images/sell.png)

#### User's Watchlist
Users are assigned a watchlist from the ```Watchlists``` table. A user's watchlist is then populated with WatchlistJoins that live on the ```WatchlistJoins``` table. This allows users to add stocks to their watchlist and view their watchlist from their dashboard. A polymorphic association exists so that a user's watched stocks can be found through WatchlistJoins.

These watched stocks are fetched on the user's dashboard and iterated over. A for loop iterates over each watched stock and fetches historical daily data in order to make them appear as visually appealing graphs on the dashboard watchlist. These are also clickable list elements that take the user to the watched stock's show page.
![watchlist](readme_images/watchlist.png)

#### User's shares
In a similar fashion, a polymorphic association exists to find a User's shares, which queries user's transactions, summing them up and returning a list of stocks that have positive amount transacted. This gives a list of currently owned shares which can be iterated over in a similar fashion and displayed under the user watchlist.

The query :

 `Transaction.where("user_id = ?",userId).group(:stock_id).having("sum(amount) > 0").sum(:amount) `

 ![watchlist](readme_images/shares.png)

#### User's Portfolio
A User's portfolio is created by creating two tables. A `PortfolioHistories` table that contains PortfolioHistories that are assigned on account creation to a user similar to a watchlist. This PortfolioHistory contains Portfolios, which are snapshots of a User's account value, that is the value of all of their owned shares at the current market price summed with the user's current funds/buying power.

Since all of this information is fetched on the User's show page, these portfolios are created and stored whenever the user visits their dashboard. This dataset is then fetched and passed into the Recharts library to generate a graph of their portfolio history.

Future todos include finding a method that can generate portfolio history with smoother data set.

![portfolio](readme_images/portfolio.png)

#### Top Movers
All stocks are fetched in the user's show page and sorted to find the top 10 with largest percent change in the past 24 hours. These are displayed on the dashboard as the top mover's, so as to help users decide which cryptocurrencies to invest in.

![movers](readme_images/movers.png)

#### Curated News
User's show page also has a news feed which goes through the user's watched stocks, concatenates all watched stocks' symbols, and looks up news in the cryptocompare API that pertains to the those symbols. This helps tailor the news to the user's interested cryptocurrencies.

![portfolio](readme_images/curated_news.png)
