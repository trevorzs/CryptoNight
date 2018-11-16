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
    if (!this.props.stock){
      return (
        <div className="overall fullsize">
          <div className="poo">
            <div className="oswego">
            </div>
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
          <h1>${this.props.stock.price}</h1>
            <LineChart width={400} height={400} data={[this.props.stock]}>
              <Line type="monotone" dataKey="uv" stroke="#8884d8" />
            </LineChart>
        </div>

      </div>
    )
  }
}

export default StockShowPage;
