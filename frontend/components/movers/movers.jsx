import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';



class Movers extends React.Component{

  sortCallback(el1,el2){
    if (el1.USD.TOTALVOLUME24HTO > el2.USD.TOTALVOLUME24HTO){
        return -1;
      }
    if (el1.USD.TOTALVOLUME24HTO < el2.USD.TOTALVOLUME24HTO){
      return 1;
    }else{
      return 0;
    }
  }

  round(number, places){
    return +(Math.round(number + "e+" + places)  + "e-" + places);
  }

  render(){
      debugger
      const sorted = this.props.stocks.sort(this.sortCallback);
      const topTen = sorted.slice(0,10);
      const result = topTen.map(stock=>{
        let changeClass;
        if (stock.USD.CHANGEPCT24HOUR > 0){
          changeClass = "movers-change-up";
        }else{
          changeClass = "movers-change-down";
        }
        return (
          <Link key={stock.id} className="movers-link" to={`/stocks/${stock.id}`}>
            <ul className="movers-list-item">
              <li className="movers-list-symbol">{stock.USD.FROMSYMBOL}</li>
              <li className="movers-list-high">Today's High: {stock.USD.HIGH24HOUR.toFixed(2)}</li>
              <li className={`${changeClass} movers-list-price`}>${stock.USD.PRICE.toFixed(2)}</li>
              <li className={`${changeClass} movers-list-change`}>{stock.USD.CHANGEPCT24HOUR.toFixed(2)}%</li>
            </ul>
          </Link>
        )
      })
      return (
        <div className="movers-div">
          {result}
        </div>
      )
    }
}

  export default Movers;
