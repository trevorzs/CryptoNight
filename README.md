# README
## CryptoNight
[Live Site](https://crypto-night.herokuapp.com)

![screenshot](readme_images/screenshot1.png)

## About
This project is a full-stack, single-page Cryptocurrency investment app inspired by Robinhood Crypto, and contains design elements from both Robinhood and Robinhood Crypto.

## Technologies
React/Redux front-end

Ruby on Rails backend with PostgreSQL database

Recharts library for data-graphing

Cryptocompare API

HTML5 and CSS3 for styling

## Features and Implementation
#### Cryptocurrencies index & sorting
![index](readme_images/cryptoindex.png)
Sends request to Rails backend in order to find list of cryptocurrencies available in database. Concatenates all cryptocurrencies' symbols and fires off one blanket request for all currencies' price data to cryptocompare API. Does this on an interval of 10 seconds, fetching live prices from the API as often as allowed.

Using local state to toggle the four parameter headings (Name, Symbol, Price, Today), toggles styling and onClick functions for each. OnClick fires off an action that sorts entire list by given parameter. This sorting does not interfere with the interval set and prices will continue live updating.

Useful for parsing cryptocurrencies by overall price or see which ones are rising and falling the fastest. Cryptocurrencies can be added to the list by simply adding to the ```Stocks``` table a cryptocurrency object with a 3 letter symbol.

#### Search by crypto name/symbol
![search](readme_images/searchbar.png)
Implemented a searchbar that queries database on either matching symbol or cryptocurrency name. Iterates over search results and toggles styling depending on matching letters entered, mimicking Robinhood searchbar. This results in intuitive and responsive UX.

Future todos include debouncing in order to minimize querying.

#### Cryptocurrency historical data chart
![stock show](readme_images/stockshowdown.png)


#### Buy/Sell Cryptocurrency

#### Cryptocurrency related news

#### Login/Signup (user authentication)
