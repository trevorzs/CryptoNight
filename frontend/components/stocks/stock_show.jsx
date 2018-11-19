import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

class StockShowPage extends React.Component{
  constructor(props){
    super(props);
    this.state  = {
      stock: ""
    }
    this.renderNews = this.renderNews.bind(this);
    this.resetData = this.resetData.bind(this);
    this.tooltipRender = this.tooltipRender.bind(this);
    this.timescale = "daily";
  }

  componentDidMount(){
    this.props.fetchStock(this.props.match.params.stock_id);
    this.interval1 = setInterval(()=>(this.props.fetchStock(this.props.match.params.stock_id)),12000);
  }


  componentWillUnmount(){
    clearInterval(this.interval1);
  }

  round(number, places){
    return +(Math.round(number + "e+" + places)  + "e-" + places);
  }

  renderNews(){
    return this.props.data.news.map((obj,i)=>{
      if (i >= 50){
        return;
      }
      const newsDate = new Date(obj.published_on*1000);
      const timediff = Date.now()-newsDate;
      let newsDay;
      if (timediff/1000/60 < 60){
        newsDay = (timediff/1000/60).toFixed(0).toString() + "m";
      }else{
        if (timediff/1000/60/60 < 24){
          newsDay = (timediff/1000/60/60).toFixed(0).toString() + "h";
        }else{
          newsDay = newsDate.toDateString().slice(4);
        }
      }
      return(
        <a key={i} href={obj.url}>
          <div key={obj.id} className="news-item">
            <img src={obj.imageurl}/>
            <div className="news-item-info">
              <div className="news-item-source-info">
                <h2 className="news-item-source">{obj.source_info.name}</h2>
                <h2 className="news-item-date">{newsDay}</h2>
              </div>
              <h2 className="news-item-title">{obj.title}</h2>
              <h2 className="news-item-body">{obj.body}</h2>
              <h2></h2>
            </div>
          </div>
        </a>
      );
    });
  }

  tooltipRender(e){
    if (e.payload && e.payload.length > 0){
      const price = e.payload[0].payload.close;
      const change = this.round(e.payload[0].payload.change,8).toString();
      const pctChange = e.payload[0].payload.pctchange.toFixed(2);
      const date = new Date(e.payload[0].payload.time*1000);
      let hour, minutes;
      if (date.getHours() > 12){
        hour = date.getHours()%12 || 12;
      }else{
        hour = date.getHours();
      }
      if (date.getMinutes() < 10){
        minutes = "0" + date.getMinutes().toString();
      }else{
        minutes = date.getMinutes();
      }
      const day = date.toDateString();
      document.getElementById("pricelabel").innerHTML = "$"+price;

      if (change < 0){
        document.getElementById("pctChangeLabel").innerHTML = `-$${change.slice(1)} (${pctChange}%)`;
      }else{
        document.getElementById("pctChangeLabel").innerHTML = `+$${change} (${pctChange}%)`;
      }
      if (this.timescale === "daily" || this.timescale === "weekly"){
        return(
          <div className="tooltip">{hour}:{minutes} {day.slice(4,-5)}</div>
        )
      }else{
        return(
          <div className="tooltip">{day.slice(4,-5)}, {day.slice(-5)}</div>
        )
      }
    }
  }

  resetData(){
      let initialPrice;
      let change;
      let initialChange;
      let monthly;
      let pctChange;
      let news;
        const monthData = this.props.data[this.timescale];
        pctChange = monthData[monthData.length-1].pctchange.toFixed(2);
        initialChange = this.round(monthData[monthData.length-1].change,8);
        if (initialChange < 0){
          initialChange = `-$${initialChange.toString().slice(1)} (${pctChange}%)`;
        }else{
          initialChange = `+$${initialChange} (${pctChange}%)`;
        }

        initialChange = initialChange
        initialPrice = "$" + monthData[monthData.length-1].close;
        monthly = this.props.data[this.timescale].slice(1);
        document.getElementById("pricelabel").innerHTML = initialPrice;
        document.getElementById("pctChangeLabel").innerHTML = initialChange;
  }

  clearTimescaleButtons(){
    const buttons = document.querySelectorAll(".timescale-btn");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("active-timescale");
    }
  }

  render(){
    if (!this.props.stock || !this.props.data || !document.getElementById("gradient")){
      return (
        <div className="overall fullsize">
          <div className="displace">
            <div id="gradient" className="gradient">
              <div id="return-button"></div>
            </div>
          </div>
          <div className="user-show-navbar">
              <Link to="/"><div className="logo"/></Link>
              <div className="nav-links">
                <Link id="navlink" to="/" className="nav-link-a">Home</Link>
                <a id="navlink" className="nav-link-a">Notifications</a>
                <button id="navlink" className="nav-link-a" onClick={this.props.logout}>Log Out</button>
              </div>
          </div>
          <div className="stock-show-main">
            <h1>LOADING</h1>
          </div>
        </div>
      )
    }else{

      let initialPrice;
      let change;
      let initialChange;
      let monthly;
      let pctChange;
      let news;
      if (this.props.data[this.timescale]){
        const monthData = this.props.data[this.timescale];
        pctChange = monthData[monthData.length-1].pctchange.toFixed(2);
        initialChange = this.round(monthData[monthData.length-1].change,8);
        const gradient = document.getElementById("gradient");
        const returnbtn = document.getElementById("return-button");
        const navlink = document.querySelectorAll("#navlink");
        news = this.renderNews();
        if (initialChange > 0){
          gradient.classList.remove("gradient");
          gradient.classList.add("gradient-up");
          returnbtn.classList.remove("return-button");
          returnbtn.classList.add("return-button-up");
          for (var i = 0; i < navlink.length; i++) {
            navlink[i].classList.remove("nav-link-a");
            navlink[i].classList.add("nav-link-a-up");
          }
        }else{
          gradient.classList.add("gradient");
          gradient.classList.remove("gradient-up");
          returnbtn.classList.add("return-button");
          returnbtn.classList.remove("return-button-up");
          for (var i = 0; i < navlink.length; i++) {
            navlink[i].classList.add("nav-link-a");
            navlink[i].classList.remove("nav-link-a-up");
          }
        }
        if (initialChange < 0){
          initialChange = `-$${initialChange.toString().slice(1)} (${pctChange}%)`;
        }else{
          initialChange = `+$${initialChange} (${pctChange}%)`;
        }

        initialChange = initialChange
        initialPrice = "$" + monthData[monthData.length-1].close;
        monthly = this.props.data[this.timescale].slice(1);
      }else{
        initialPrice = "Loading";
        change="Loading";
        pctChange = "Loading";
        initialChange = "Loading";
        news = "Loading";
      }
      return (
        <div className="overall fullsize scroll">
          <div className="displace">
            <div id="gradient" className="gradient">
            </div>
          </div>
          <div className="user-show-navbar">
              <Link to="/"><div className="logo"/></Link>
              <div className="nav-links">
                <Link id="navlink" to="/" className="nav-link-a">Home</Link>
                <a id="navlink" className="nav-link-a">Notifications</a>
                <button id="navlink" className="nav-link-a" onClick={this.props.logout}>Log Out</button>
              </div>
          </div>
          <div className="stock-show-main">
            <Link to="/stocks"><h2 id="return-button" className="return-button">Cryptocurrencies</h2></Link>
            <h1 id="stockLabel">{this.props.stock.name}</h1>
            <h1 id="pricelabel">{initialPrice}</h1>
            <h2 id="pctChangeLabel">{initialChange}</h2>
              <LineChart width={800} height={240}
                margin={{ top: 30, right: 70, left: -30, bottom: 5 }} onMouseLeave={this.resetData}
                 data={monthly}>
                <Line type="monotone" dataKey="close" stroke="white" dot={false}/>
                  <XAxis dataKey="time" hide={true} padding={{ left: 40, right: 40 }}/>
                  <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true}/>
                  <Tooltip isAnimationActive={false} position={{ y: 10 }} offset={-32} content={this.tooltipRender.bind(this)}/>
              </LineChart>
              <ul className="timescale-btn-list">
                <button id="tdaily" className="timescale-btn active-timescale" onClick={()=>{
                    this.timescale = "daily";
                    this.setState(this.state);
                    this.clearTimescaleButtons();
                    document.getElementById("tdaily").classList.add("active-timescale");
                }}>1D</button>
              <button id="tweekly" className="timescale-btn" onClick={()=>{
                    this.timescale = "weekly";
                    this.setState(this.state);
                    this.clearTimescaleButtons();
                    document.getElementById("tweekly").classList.add("active-timescale");
                }}>1W</button>
              <button id="tmonthly" className="timescale-btn" onClick={()=>{
                    this.timescale = "monthly";
                    this.setState(this.state);
                    this.clearTimescaleButtons();
                    document.getElementById("tmonthly").classList.add("active-timescale");
                }}>1M</button>
              <button id="ttrimonthly" className="timescale-btn" onClick={()=>{
                    this.timescale = "trimonthly";
                    this.setState(this.state);
                    this.clearTimescaleButtons();
                    document.getElementById("ttrimonthly").classList.add("active-timescale");
                }}>3M</button>
              <button id="tyearly" className="timescale-btn" onClick={()=>{
                    this.timescale = "yearly";
                    this.setState(this.state);
                    this.clearTimescaleButtons();
                    document.getElementById("tyearly").classList.add("active-timescale");
                }}>1Y</button>
              </ul>
            <div className="news-div">
              <h1 className="news-header">News</h1>
              {news}
            </div>
          </div>
        </div>
      )
    }
  }
}

export default StockShowPage;
