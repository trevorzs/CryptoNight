import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';
import NavbarContainer from '../navbar/navbar_container';
import NewsContainer from '../news/news_container';
import MoversContainer from '../movers/movers_container';
import Loading from '../loading/loading';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';


class UserShowPage extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.needsLoading();
    this.props.findAllShares(this.props.currentUser.id).then(
      response=>   {if (this.props.watchlist.length > 0){
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
        }else{
          this.props.doneLoading();
        }
      }
    );
  }

  componentDidUpdate(oldprops){
    if (this.props.match.params !== oldprops.match.params){
      this.props.needsLoading();
      this.props.findAllShares(this.props.currentUser.id).then(
        response=>   {if (this.props.watchlist.length > 0){
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
          }else{
            this.props.doneLoading();
          }
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
    let watchlistitems;
    let chart;
    let graphClass;
    let news, movers;
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
          for (var i = 0; i < Object.keys(sharelist).length; i++) {
            const stockId = Object.keys(sharelist)[i];
            const shareAmount = sharelist[stockId];
            if (this.props.stocks[stockId].USD && this.props.stocks[stockId].USD.PRICE*shareAmount){
              shareworth += this.props.stocks[stockId].USD.PRICE*shareAmount;
            }
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
                    <LineChart className={graphClass} width={45} height={40}
                      margin={{ top: 25, right: 0, left: 0, bottom: 0 }} onMouseLeave={this.resetData}
                       data={stockslist[stockId].daily}>
                       <filter id="hello"></filter>
                      <Line type="monotone" dataKey="close" stroke="white" dot={false}/>
                        <XAxis dataKey="time" hide={true} padding={{ left: 0, right: 0 }} />
                        <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true}/>
                    </LineChart>
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
            <LineChart className={graphClass} width={50} height={40}
              margin={{ top: 25, right: 0, left: 0, bottom: 0 }} onMouseLeave={this.resetData}
               data={stock.daily}>
               <filter id="hello"></filter>
              <Line type="monotone" dataKey="close" stroke="white" dot={false}/>
                <XAxis dataKey="time" hide={true} padding={{ left: 0, right: 0 }} />
                <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true}/>
            </LineChart>
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
            <h1>Welcome to CryptoNight</h1>
            <h2 className="user-show-name">{this.props.currentUser.first_name} {this.props.currentUser.last_name}{"'s"} Dashboard</h2>
            <h2 className="user-show-name">Buying Power: ${this.round(this.props.currentUser.funds,4)}</h2>
            <h2 className="user-show-name">Account Value: ${this.round((shareworth + this.props.currentUser.funds),4)}</h2>
            <Link className="user-show-button" to="/stocks">Cryptocurrencies</Link>
            <div className="filler"></div>
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
