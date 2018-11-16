import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';
import { LineChart, Line } from 'recharts';



class StockShowPage extends React.Component{
  constructor(props){
    super(props);
    this.state  = {
      stock: ""
    }
  }

  componentDidMount(){
    this.props.fetchStock(this.props.match.params.stock_id);
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
          <h1>{this.props.stock.name} - {this.props.stock.symbol}</h1>
          <h1>${this.props.data.price}</h1>

        </div>

      </div>
    )
  }
}

export default StockShowPage;
