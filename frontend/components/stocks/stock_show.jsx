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
    this.timescale = this.props.data.daily;
    this.renderNews = this.renderNews.bind(this);
  }

  componentDidMount(){
    this.props.fetchStock(this.props.match.params.stock_id);
  }

  round(number, places){
    return +(Math.round(number + "e+" + places)  + "e-" + places);
  }

  renderNews(){
    return this.props.data.news.map((obj,i)=>{
      if (i >= 10){
        return;
      }
      return(
        <a key={i} href={obj.url}>
          <div key={obj.id} className="news-item">
            <img src={obj.imageurl}/>
            <div className="news-item-info">
              <h2 className="news-item-source">{obj.source_info.name}</h2>
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
      const day = date.toDateString();
      const month = date.getMonth()+1;
      const year = date.getFullYear();
      document.getElementById("pricelabel").innerHTML = "$"+price;

      if (change < 0){
        document.getElementById("pctChangeLabel").innerHTML = `-$${change.slice(1)} (${pctChange}%)`;
      }else{
        document.getElementById("pctChangeLabel").innerHTML = `+$${change} (${pctChange}%)`;
      }
      return(
        <div className="tooltip">{day.slice(4,-5)}, {day.slice(-5)}</div>
      )
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
      if (this.props.data.monthly){
        const monthData = this.props.data.monthly
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
        monthly = this.props.data.monthly.slice(1);
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
              <LineChart width={680} height={300}
                margin={{ top: 50, right: 70, left: 0, bottom: 5 }}
                 data={monthly}>
                <Line type="monotone" dataKey="close" stroke="white" dot={false}/>
                  <XAxis dataKey="time" hide={true} padding={{ left: 40, right: 40 }}/>
                  <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true}/>
                  <Tooltip isAnimationActive={false} position={{ y: 20 }} offset={-32} content={this.tooltipRender.bind(this)}/>
              </LineChart>
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
