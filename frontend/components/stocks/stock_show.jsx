import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import NavbarContainer from '../navbar/navbar_container';
import NewsContainer from '../news/news_container';
import ChartContainer from '../chart/chart_container';
import TransactionFormContainer from '../transaction/transaction_form_container';
import Loading from '../loading/loading';

class StockShowPage extends React.Component{
  constructor(props){
    super(props);
    this.state  = {
      timescale: "daily"
    }
  }

  componentDidMount(){
    this.props.fetchStock(this.props.match.params.stock_id);
    this.interval1 = setInterval(()=>(this.props.fetchStock(this.props.match.params.stock_id)),10000);
  }

  componentDidUpdate(oldprops){
    if (this.props.match.params !== oldprops.match.params){
      this.props.fetchStock(this.props.match.params.stock_id);
      this.props.clearSearch();
      this.props.clearData();
    }
  }

  componentWillUnmount(){
    clearInterval(this.interval1);
    this.props.clearSearch();
    this.props.clearData();
  }

  round(number, places){
    return +(Math.round(number + "e+" + places)  + "e-" + places);
  }

  clearTimescaleButtons(){
    const buttons = document.querySelectorAll(".timescale-btn");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("active-timescale");
      buttons[i].classList.remove("active-timescale-down");
      buttons[i].classList.remove("active-timescale-up");
    }
  }

  render(){
    if (!this.props.stock || !this.props.data || !document.getElementById("gradient")){
      return (
        <Loading />
      )
    }
      let initialPrice;
      let change;
      let initialChange;
      let monthly;
      let pctChange;
      let news;
      let rb, gd, at, nv;
      let addedStocks;
      let button;
      let watchlistbutton, transactionbutton;

      if (this.props.data[this.state.timescale]){
        const monthData = this.props.data[this.state.timescale];
        pctChange = monthData[monthData.length-1].pctchange.toFixed(2);
        initialChange = this.round(monthData[monthData.length-1].change,8);

        const active = document.querySelector(".active-timescale");
        news = (<NewsContainer />);
        if (active){
          if(initialChange > 0 ){
            active.classList.remove("active-timescale-down");
            active.classList.add("active-timescale-up");
          }else{
            active.classList.add("active-timescale-down");
            active.classList.remove("active-timescale-up");
          }
        }
        if (initialChange < 0){
          nv = "nav-link-a";
          at = "active-timescale-down";
          rb = "return-button";
          gd = "gradient";
          watchlistbutton = "watchlist-button-down";
          transactionbutton = "transaction-form-btn-down";
          initialChange = `-$${initialChange.toString().slice(1)} (${pctChange}%)`;
        }else{
          nv = "nav-link-a-up";
          at = "active-timescale-up";
          rb = "return-button-up";
          gd = "gradient-up";
          watchlistbutton = "watchlist-button-up";
          transactionbutton = "transaction-form-btn-up";
          initialChange = `+$${initialChange} (${pctChange}%)`;
        }

        if (!this.props.watchlist.includes(this.props.stock.id)){
          button = (
            <button className={watchlistbutton} onClick={()=>{
                    this.props.addToWatchlist({
                      watchlist_id: this.props.currentUser.watchlistId,
                      stock_id: this.props.stock.id
                    })
                  }}>Add to Watchlist</button>
              );
        }else{
          button = (
            <button className={watchlistbutton} onClick={()=>{
                    this.props.removeFromWatchlist({
                      watchlist_id: this.props.currentUser.watchlistId,
                      stock_id: this.props.stock.id
                    })
                  }}>Remove from Watchlist</button>
              );
        }

        initialChange = initialChange
        initialPrice = "$" + monthData[monthData.length-1].close;
        monthly = this.props.data[this.state.timescale].slice(1);
      }else{
        gd = "gradient";
        initialPrice = "Loading";
        change="Loading";
        pctChange = "Loading";
        initialChange = "Loading";
        news = "Loading";
        button = <button className="watchlist-button-down">Loading</button>
      }
      return (
        <div className="overall fullsize scroll">
          <div className="displace">
            <div id="gradient" className={gd}>
            </div>
          </div>

          <NavbarContainer navlink={nv}/>

          <div className="main-wrapper">
            <div className="stock-show-main">
              <Link to="/stocks"><h2 id="return-button" className={rb}>Cryptocurrencies</h2></Link>
              <h1 id="stockLabel">{this.props.stock.name}</h1>
              <h1 id="pricelabel">{initialPrice}</h1>
              <h2 id="pctChangeLabel">{initialChange}</h2>
              <ChartContainer width={800} height={240}
                margin={{ top:30, right:70, left:-30, bottom:5}}
                data={monthly} timescale={this.state.timescale}
                xDataKey={"time"} yDataKey={"close"}/>

                <ul className="timescale-btn-list">
                  <button id="tdaily" className="timescale-btn active-timescale" onClick={()=>{
                      this.setState(merge(this.state,{timescale:"daily"}));
                      this.clearTimescaleButtons();
                      document.getElementById("tdaily").classList.add("active-timescale");
                  }}>1 D</button>
                <button id="tweekly" className="timescale-btn" onClick={()=>{
                      this.setState(merge(this.state,{timescale:"weekly"}));
                      this.clearTimescaleButtons();
                      document.getElementById("tweekly").classList.add("active-timescale");
                  }}>1 W</button>
                <button id="tmonthly" className="timescale-btn" onClick={()=>{
                      this.setState(merge(this.state,{timescale:"monthly"}));
                      this.clearTimescaleButtons();
                      document.getElementById("tmonthly").classList.add("active-timescale");
                  }}>1 M</button>
                <button id="ttrimonthly" className="timescale-btn" onClick={()=>{
                      this.setState(merge(this.state,{timescale:"trimonthly"}));
                      this.clearTimescaleButtons();
                      document.getElementById("ttrimonthly").classList.add("active-timescale");
                  }}>3 M</button>
                <button id="tyearly" className="timescale-btn" onClick={()=>{
                      this.setState(merge(this.state,{timescale:"yearly"}));
                      this.clearTimescaleButtons();
                      document.getElementById("tyearly").classList.add("active-timescale");
                  }}>1 Y</button>
                <button id="tfiveyearly" className="timescale-btn" onClick={()=>{
                        this.setState(merge(this.state,{timescale:"fiveyearly"}));
                        this.clearTimescaleButtons();
                        document.getElementById("tfiveyearly").classList.add("active-timescale");
                    }}>5 Y</button>
                </ul>

              <div className="news-div">
                <h1 className="news-header">News</h1>
                {news}
              </div>
            </div>

            <div className="stock-action-menu">
              <TransactionFormContainer button={transactionbutton} stock={this.props.stock}/>
              {button}
            </div>
        </div>
      </div>
      )

  }
}

export default StockShowPage;
