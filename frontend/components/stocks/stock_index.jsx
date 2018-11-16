import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';



class StockIndex extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchStocks()
  }

  render(){
    const stocks = this.props.stocks.map(stock => (
    <Link key={stock.id}  to={`stocks/${stock.id}`}>
      <ul className="stock-index-list-item">
        <li>{stock.name}</li>
        <li className="stock-index-price">{stock.price}</li>
      <li></li>
      <li></li>
    </ul>
    </Link>
    ))
    return (
      <div className="overall fullsize">
        <div className="poo">
          <div className="oswego">
          </div>
        </div>
        <div className="user-show-navbar">
          <div className="logo"/>
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
              <li>Price</li>
              <li></li>
              <li></li>
            </ul>
            {stocks}
          </div>
        </div>

      </div>
    )
  }
}

export default StockIndex;
