import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';



class StockIndex extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchStocks();
    this.interval1 = setInterval(()=>(this.props.updateStocks(this.props.symbols)),8000);
  }

  componentWillUnmount(){
    clearInterval(this.interval1);
  }

  render(){
    const parseChange = (change) => {
      if (change>0){
        return (<li><span className="uparrow">&#9650;</span> {change}%</li>)
      }
      if (change<0){
        return (<li><span className="downarrow">&#9660;</span> {change.slice(1)}%</li>)
      }
    }

    if (!this.props.data.symbols){
      return (
        <div className="overall fullsize">
          <div className="poo">
            <div className="oswego">
            </div>
          </div>
          <div className="stock-show-main">
            <h1>LOADING</h1>
          </div>
        </div>
      )
    }else{
      const stocks = this.props.stocks.map(stock => {
        if (typeof stock.id === "number"){
      return (
      <Link key={stock.id}  to={`stocks/${stock.id}`}>
        <ul className="stock-index-list-item">
          <li>{stock.name}</li>
          <li>{stock.symbol}</li>
          <li>{stock.price}</li>
          {parseChange(stock.todayChange)}
        </ul>
      </Link>
    )}})

      return (
        <div className="overall fullsize scroll">
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
          <div className="stock-index">
            <h1>Cryptocurrencies</h1>
            <p>{stocks.length} Cryptocurrencies</p>
            <div className="stock-index-list">
              <ul className="stock-index-list-header">
                <li>Name</li>
                <li>Symbol</li>
                <li>Price</li>
                <li>Today</li>
              </ul>
              {stocks}
            </div>
          </div>

        </div>
      )
    }
  }
}

export default StockIndex;
