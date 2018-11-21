import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';
import NavbarContainer from '../navbar/navbar_container';
import Loading from '../loading/loading';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';


class UserShowPage extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.needsLoading();
    if (this.props.watchlist){
        this.props.altFetchStocks().then(response=>{
          const arrs = this.props.watchlist.map((stockid)=>{
            return(
              [response.stocks[stockid].symbol,stockid]
            )
          });
          this.props.watchlistDataFetch(arrs);
        })
    }else{
      this.props.doneLoading();
    }
  }

  componentDidUpdate(oldprops){
    if (this.props.match.params !== oldprops.match.params){
      this.props.needsLoading();
      if (this.props.watchlist){
          this.props.altFetchStocks().then(response=>{
            const arrs = this.props.watchlist.map((stockid)=>{
              return(
                [response.stocks[stockid].symbol,stockid]
              )
            });
            this.props.watchlistDataFetch(arrs);
          })
      }else{
        this.props.doneLoading();
      }
    }
  }

  round(number, places){
    return +(Math.round(number + "e+" + places)  + "e-" + places);
  }

  render(){
    if (this.props.loading){

      return (
        <Loading />
      )
    }

    let watchlistitems;
    let chart;
    let graphClass;
    if (this.props.watchlist){

      let stock;
      let price;
      watchlistitems = this.props.watchlist.map((id)=>{
        stock = this.props.stocks[id]
        if (!stock.USD){
          stock.USD = {CHANGEPCT24HOUR: "loading",
                        PRICE: "loading"}
        }else{
          if (stock.USD.CHANGEPCT24HOUR > 0){
            graphClass = "watchlist-graph-up";
          }else{
            graphClass = "watchlist-graph-down"
          }
          price = "$" +this.round(stock.USD.PRICE,8).toString();
          chart = (
            <LineChart className={graphClass} width={50} height={40}
              margin={{ top: 25, right: 0, left: 0, bottom: 0 }} onMouseLeave={this.resetData}
               data={stock.daily}>
               <filter id="hello"></filter>
              <Line type="monotone" dataKey="close" stroke="white" dot={false}/>
                <XAxis dataKey="time" hide={true} padding={{ left: 0, right: 0 }} />
                <YAxis type="number" domain={['dataMin', 'dataMax']} hide={true}/>
            </LineChart>
          )
        }
        return(
          <Link to={`/stocks/${stock.id}`} key={stock.id}>
            <ul className="watchlist-item">
              <li>{stock.USD.FROMSYMBOL}</li>
              {chart}
              <li>{price}</li>
            </ul>
          </Link>
        )
      })
    }

    return (
      <div className="overall fullsize">
        <div className="displace">
          <div className="gradient">
          </div>
        </div>
        <NavbarContainer />
        <div className="user-show-main">
          <h1>Welcome to CryptoNight</h1>
          <Link className="user-show-button" to="/stocks">Cryptocurrencies</Link>
          <ul className="watchlist scroll">
            <li className="watchlist-header">Watchlist</li>
            {watchlistitems}
          </ul>
        </div>

      </div>
    )
  }
}

export default UserShowPage;
