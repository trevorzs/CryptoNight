import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';
import TinyChartContainer from '../tiny_chart/tiny_chart_container';

class WatchlistShares extends React.Component{
  constructor(props){
    super(props);
  }

  round(number, places){
    return +(Math.round(number + "e+" + places)  + "e-" + places);
  }

  render(){
      return (
        this.props.stockIds.map((stockId)=>{
          let graphClass, price;
          if (this.props.stocks[stockId] && this.props.stocks[stockId].USD){
            price = "$" +this.round(this.props.stocks[stockId].USD.PRICE,5).toString();
            if (this.props.stocks[stockId].USD.CHANGEPCT24HOUR > 0){
              graphClass = "watchlist-graph-up";
            }else{
              graphClass = "watchlist-graph-down"
            }
          }

          return(
             <Link to={`/stocks/${stockId}`} key={stockId}>
               <ul className="watchlist-item">
                 <div className="watchlist-share-item">
                   <li>{this.props.stocks[stockId].symbol}</li>
                   <li>{this.props.shares[stockId]} shares</li>
                 </div>
                   <TinyChartContainer graphClass = {graphClass} data={this.props.stocks[stockId].daily}/>
                 <li>{price}</li>
               </ul>
             </Link>
           )}
      ))
    }
}

  export default WatchlistShares;
