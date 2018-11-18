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
  }

  componentDidMount(){
    this.props.fetchStock(this.props.match.params.stock_id);
  }

  round(number, places){
    return +(Math.round(number + "e+" + places)  + "e-" + places);
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
      if (pctChange < 0){
        if (change < 0){
          document.getElementById("pctChangeLabel").innerHTML = `-$${change.slice(1)} (-%${pctChange.toString().slice(1)})`;
        }else{
          document.getElementById("pctChangeLabel").innerHTML = `+$${change} (-%${pctChange.toString().slice(1)})`;
        }
      }else{
        if (change <0){
          document.getElementById("pctChangeLabel").innerHTML = `-$${change.slice(1)} %${pctChange}`
        } else{
          document.getElementById("pctChangeLabel").innerHTML = `+$${change} %${pctChange}`
        }
      }


      return(
        <div className="tooltip">{day.slice(4,-5)}, {day.slice(-5)}</div>
      )
    }
  }

  render(){
    if (!this.props.stock || !this.props.data){
      return (
        <div className="overall fullsize">
          <div className="poo">
            <div className="oswego">
            </div>
          </div>
          <div className="user-show-navbar">
              <Link to="/"><div className="logo"/></Link>
              <div className="nav-links">
                <Link to="/" className="nav-link-a">Home</Link>
                <a className="nav-link-a">Notifications</a>
                <button className="nav-link-a" onClick={this.props.logout}>Log Out</button>
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
      if (this.props.data.monthly){
        const monthData = this.props.data.monthly
        initialPrice = "$" + monthData[monthData.length-1].close;
        monthly = this.props.data.monthly.slice(1);
      }else{
        initialPrice = "Loading";
        change="Loading";
        pctChange = "Loading";
      }
      return (
        <div className="overall fullsize">
          <div className="poo">
            <div className="oswego">
            </div>
          </div>
          <div className="user-show-navbar">
              <Link to="/"><div className="logo"/></Link>
              <div className="nav-links">
                <Link to="/" className="nav-link-a">Home</Link>
                <a className="nav-link-a">Notifications</a>
                <button className="nav-link-a" onClick={this.props.logout}>Log Out</button>
              </div>
          </div>
          <div className="stock-show-main">
            <Link to="/stocks"><h2 className="return-button">Cryptocurrencies</h2></Link>
            <h1 id="stockLabel">{this.props.stock.name}</h1>
            <h1 id="pricelabel">{initialPrice}</h1>
            <h2 id="pctChangeLabel">{pctChange}</h2>
              <LineChart width={680} height={300}
                margin={{ top: 50, right: 70, left: 0, bottom: 5 }}
                 data={monthly}>
                <Line type="monotone" dataKey="close" stroke="white" dot={false}/>
                  <XAxis dataKey="time" hide={true}/>
                  <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true}/>
                  <Tooltip isAnimationActive={false} position={{ y: 20 }} offset={-32} content={this.tooltipRender.bind(this)}/>
              </LineChart>

          </div>
        </div>
      )
    }
  }
}

export default StockShowPage;
