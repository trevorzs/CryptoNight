import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';
import NavbarContainer from '../navbar/navbar_container';
import NewsContainer from '../news/news_container';
import MoversContainer from '../movers/movers_container';
import DashboardContainer from '../dashboard/dashboard_container';
import TinyChartContainer from '../tiny_chart/tiny_chart_container';
import WatchlistContainer from '../watchlist/watchlist_container';
import WatchlistSharesContainer from '../watchlist_shares/watchlist_shares_container';
import Loading from '../loading/loading';


class UserShowPage extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.needsLoading();
    this.props.findAllShares(this.props.currentUser.id).then(
      response=>   {
          const shareIds = Object.keys(this.props.shares);
          const shareArr = [];
          for (var i = 0; i < shareIds.length; i++) {
            const shareId = parseInt(shareIds[i]);
            if (!this.props.watchlist.includes(shareId)){
              shareArr.push(shareId);
            }
          }
          const allIds = shareArr.concat(this.props.watchlist);
          this.props.altFetchStocks(allIds);
          this.props.fetchPortfolios();
      }
    );
  }

  round(number, places){
    return +(Math.round(number + "e+" + places)  + "e-" + places);
  }

  render(){
    if (this.props.loading){

      return (
        <Loading />
      )
    }
    let watchListItems, chart, graphClass;
    let sharelist, ownedShares,  stockslist, shareHeader, shareArr;
    let shareworth = 0.0;
    let stock, price, symbol;


    //calculate portfolio worth to add to portfolio history
    //relegate to helper function
    shareArr = Object.keys(this.props.shares);
    if (shareArr.length > 0){
      shareHeader = (
        <li className="watchlist-sub-header share-item">Shares</li>
      )
      let stockslist = this.props.stocks;
      sharelist = this.props.shares;
      let stock, shareAmount, stockId;
      for (var i = 0; i < Object.keys(sharelist).length; i++) {
        stockId = Object.keys(sharelist)[i];
        shareAmount = sharelist[stockId];
        stock = this.props.stocks[stockId];
        if (stock && stock.USD && stock.USD.PRICE*shareAmount){
          shareworth += this.props.stocks[stockId].USD.PRICE*shareAmount;
        }
      }
      if (!(this.props.stocks instanceof Array)){
        this.props.createPortfolio({account_value: this.round((shareworth+this.props.currentUser.funds),4)});
      }
     }

    return (
      <div className="overall fullsize scroll">
        <div className="displace">
          <div className="gradient">
          </div>
        </div>
        <NavbarContainer />
        <div className="main-wrapper">
          <div className="user-show-main">
            <h2 className="user-show-name">{this.props.currentUser.first_name} {this.props.currentUser.last_name}{"'s"} Dashboard</h2>
            <h2 className="user-show-name">Buying Power: ${this.round(this.props.currentUser.funds,4)}</h2>
            <DashboardContainer />
            <div className="news-div">
              <h1 className="news-header">Top Movers</h1>
              <MoversContainer />
            </div>
            <div className="news-div">
              <h1 className="news-header">Curated News</h1>
              <NewsContainer />
            </div>
          </div>
          <div className="user-show-watchlist">
            <ul className="watchlist scroll">
              <li className="watchlist-header">Watchlist</li>
            <Link to="/stocks"><li className="watchlist-sub-header">Cryptocurrencies</li></Link>
              <WatchlistContainer stocks = {this.props.stocks} watchlist={this.props.watchlist}/>
              {shareHeader}
              <WatchlistSharesContainer stockIds={shareArr} shares={this.props.shares} stocks={this.props.stocks} />
            </ul>
          </div>
        </div>

      </div>
    )
  }
}

export default UserShowPage;
