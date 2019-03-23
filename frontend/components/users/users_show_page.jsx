import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';
import NavbarContainer from '../navbar/navbar_container';
import NewsContainer from '../news/news_container';
import MoversContainer from '../movers/movers_container';
import DashboardContainer from '../dashboard/dashboard_container';
import TinyChartContainer from '../tiny_chart/tiny_chart_container';
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

  componentDidUpdate(oldprops){
    if (this.props.match.params !== oldprops.match.params){
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
        }
      );
    }
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
    let watchlistitems, chart, graphClass, news, movers;
    let sharelist, ownedShares,  stockslist, shareheader;
    let shareworth = 0.0;
    const shareArr = Object.keys(this.props.shares);
    if (this.props.watchlist){
      let stock, price, symbol;
      let keys = Object.keys(this.props.stocks);
      if (keys.length > 1 && this.props.stocks[keys[0]].USD){
        movers = (
          <div className="news-div">
            <h1 className="news-header">Top Movers</h1>
            <MoversContainer />
          </div>
        );
      }
      if (this.props.news.length > 0){
        news = (
          <div className="news-div">
            <h1 className="news-header">Curated News</h1>
            <NewsContainer />
          </div>
        );
        if (shareArr.length > 0){
          shareheader = (
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
         ownedShares = shareArr.map((stockId)=>{
           if (stockslist[stockId] && stockslist[stockId].USD){
             price = "$" +this.round(stockslist[stockId].USD.PRICE,5).toString();
             if (stockslist[stockId].USD.CHANGEPCT24HOUR > 0){
               graphClass = "watchlist-graph-up";
             }else{
               graphClass = "watchlist-graph-down"
             }
           }
           if (stockslist[stockId]){
             return(
              <Link to={`/stocks/${stockId}`} key={stockId}>
                <ul className="watchlist-item">
                  <div className="watchlist-share-item">
                    <li>{stockslist[stockId].symbol}</li>
                    <li>{sharelist[stockId]} shares</li>
                  </div>
                    <TinyChartContainer graphClass = {graphClass} data={stockslist[stockId].daily}/>
                  <li>{price}</li>
                </ul>
              </Link>
            )}
           }
         )
       }
      }

      watchlistitems = this.props.watchlist.map((id)=>{
        stock = this.props.stocks[id];
        if (stock && stock.USD && stock.USD.CHANGEPCT24HOUR){
          if (stock.USD.CHANGEPCT24HOUR > 0){
            graphClass = "watchlist-graph-up";
          }else{
            graphClass = "watchlist-graph-down"
          }
          symbol = stock.USD.FROMSYMBOL;
          price = "$" +this.round(stock.USD.PRICE,5).toString();
          chart = (
            <TinyChartContainer graphClass = {graphClass} data={stock.daily} />
          )
          return(
            <Link to={`/stocks/${stock.id}`} key={stock.id}>
              <ul className="watchlist-item">
                <li>{symbol}</li>
                {chart}
                <li>{price}</li>
              </ul>
            </Link>
          )
        }
      })
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
            {movers}
            {news}
          </div>
          <div className="user-show-watchlist">
            <ul className="watchlist scroll">
              <li className="watchlist-header">Watchlist</li>
            <Link to="/stocks"><li className="watchlist-sub-header">Cryptocurrencies</li></Link>
              {watchlistitems}
              {shareheader}
              {ownedShares}
            </ul>
          </div>
        </div>

      </div>
    )
  }
}

export default UserShowPage;
