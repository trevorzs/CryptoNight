import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';
import TinyChartContainer from '../tiny_chart/tiny_chart_container';

class Watchlist extends React.Component{
  constructor(props){
    super(props);
  }

  round(number, places){
    return +(Math.round(number + "e+" + places)  + "e-" + places);
  }

  render(){
    return (
      this.props.watchlist.map((id)=>{
        let graphClass;
        let stock = this.props.stocks[id];
        if (stock && stock.USD && stock.USD.CHANGEPCT24HOUR){
          if (stock.USD.CHANGEPCT24HOUR > 0){
            graphClass = "watchlist-graph-up";
          }else{
            graphClass = "watchlist-graph-down"
          }
          let symbol = stock.USD.FROMSYMBOL;
          let price = "$" +this.round(stock.USD.PRICE,5).toString();
          let chart = (
            <TinyChartContainer graphClass = {graphClass} data={stock.daily} />
          )
          return(
            <Link to={`/stocks/${stock.id}`} key={stock.id}>
              <ul className="watchlist-item">
                <li>{symbol}</li>
                {chart}
                <li>{price}</li>
              </ul>
            </Link>
          )
        }
      }
    ));
  }
}

export default Watchlist;
