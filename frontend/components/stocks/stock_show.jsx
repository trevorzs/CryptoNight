import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';


class StockShowPage extends React.Component{
  constructor(props){
    super(props);
    this.state  = {
      stock: ""
    }
  }

  componentDidMount(){
    this.props.fetchStock(this.props.match.params.stock_id).then((response)=>{
      this.props.fetchPrice(response.stock.symbol,response.stock.id)
    })
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
            <div className="logo"/>
            <div className="nav-links">
              <Link to="/" className="nav-link-a">Home</Link>
              <a className="nav-link-a">Notifications</a>
              <button className="nav-link-a" onClick={this.props.logout}>Log Out</button>
            </div>
        </div>
        <div className="stock-show-main">
          <h1>{this.props.stock.name} - {this.props.stock.symbol}</h1>
          <h1>${this.props.stock.price}</h1>
        </div>

      </div>
    )
  }
}

export default StockShowPage;
