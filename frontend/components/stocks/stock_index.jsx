import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';
import Loading from '../loading/loading';
import NavbarContainer from '../navbar/navbar_container';

class StockIndex extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name_up: true,
      symbol_up: false,
      price_up: true,
      today_up: true,
      active: "none"
    }
    this.arrangeStocksAscending = this.arrangeStocksAscending.bind(this);
  }

  arrangeStocksAscending(param, up, option = false){
    const sorted = this.props.stocks.sort(this.sortCallback(param,up,option));
    this.props.receiveSortedStocks(sorted);
  }

  componentDidMount(){
    this.props.needsLoading();
    this.props.fetchStocks();
    this.interval1 = setInterval(()=>(this.props.updateStocks(this.props.symbols)),10000);

  }

  componentWillUnmount(){
    clearInterval(this.interval1);
    this.props.clearData();
    this.props.needsLoading();
  }

  sortCallback(param,up,option){
    if (option){
      if (up){
        return (
          (el1,el2) => {
          return(  el1.USD[param] > el2.USD[param] ? 1 : el1.USD[param] < el2.USD[param] ? -1 : 0)
          }
        )
      }else{
        return (
          (el1,el2) => {
          return(  el1.USD[param] > el2.USD[param] ? -1 : el1.USD[param] < el2.USD[param] ? 1 : 0)
          }
        )
      }
    }
    if (up){
      return (
        (el1,el2) => {
        return(  el1[param] > el2[param] ? 1 : el1[param] < el2[param] ? -1 : 0)
        }
      )
    }else{
      return (
        (el1,el2) => {
        return(  el1[param] > el2[param] ? -1 : el1[param] < el2[param] ? 1 : 0)
        }
      )
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
    let nameArrow, symbolArrow, priceArrow, todayArrow;
    let nameClass, symbolClass, priceClass, todayClass;

    if (this.state.active === "name"){
      if (this.state.name_up){
        nameArrow = (<span className="downarrow">&#9650;</span>);
      }else{
        nameArrow = (<span className="downarrow">&#9660;</span>);
      }
      nameClass = "index-active";
    }else{
      nameClass = "";
    }

    if (this.state.active === "symbol"){
      if (this.state.symbol_up){
        symbolArrow = (<span className="downarrow">&#9650;</span>);
      }else{
        symbolArrow = (<span className="downarrow">&#9660;</span>);
      }
      symbolClass = "index-active";
    }else{
      symbolClass = "";
    }

    if (this.state.active === "price"){
      if (this.state.price_up){
        priceArrow = (<span className="downarrow">&#9650;</span>);
      }else{
        priceArrow = (<span className="downarrow">&#9660;</span>);
      }
      priceClass = "index-active";
    }
    if (this.state.active === "today"){
      if (this.state.today_up){
        todayArrow = (<span className="downarrow">&#9650;</span>);
      }else{
        todayArrow = (<span className="downarrow">&#9660;</span>);
      }
      todayClass = "index-active";
    }else{
      todayClass = "";
    }

    const parseChange = (change) => {
      if (change>0){
        return (<li><span className="uparrow">&#9650;</span> {change}%</li>)
      }
      if (change<0){
        return (<li><span className="downarrow">&#9660;</span> {change}%</li>)
      }
      if (typeof change === "string"){
        return (
          <li>{change}</li>
        );
      }
    }

    const stocks = this.props.stocks.map(stock => {
        if (typeof stock.id === "number" && stock.USD){
          return (
          <Link key={stock.id}  to={`stocks/${stock.id}`}>
            <ul className="stock-index-list-item">
              <li>{stock.name}</li>
              <li>{stock.symbol}</li>
              <li>${this.round(stock.USD.PRICE,5)}</li>
              {parseChange(stock.USD.CHANGEPCT24HOUR.toFixed(2))}
            </ul>
          </Link>
        );
      }
    });

    return (
      <div className="overall fullsize scroll">
        <div className="displace">
          <div className="gradient">
          </div>
        </div>
        <NavbarContainer />
        <div className="main-wrapper">
          <div className="stock-index">
            <h1>Cryptocurrencies</h1>
            <p>{stocks.length} Cryptocurrencies</p>

            <div className="stock-index-list">
              <ul className="stock-index-list-header">

                <li className={nameClass} onClick={() => {
                    this.setState({name_up: !this.state.name_up, active: "name"})
                    this.arrangeStocksAscending("name",!this.state.name_up);
                  }}>Name {nameArrow}</li>

                <li className={symbolClass} onClick={() => {
                    this.setState({symbol_up: !this.state.symbol_up, active: "symbol"})
                    this.arrangeStocksAscending("symbol",!this.state.symbol_up);
                  }}>Symbol {symbolArrow}</li>

                <li className={priceClass} onClick={() => {
                    this.setState({price_up: !this.state.price_up, active: "price"})
                    this.arrangeStocksAscending("PRICE",!this.state.price_up,true);
                  }}>Price {priceArrow}</li>

                <li className={todayClass} onClick={() => {
                    this.setState({today_up: !this.state.today_up, active: "today"})
                    this.arrangeStocksAscending("CHANGEPCT24HOUR",!this.state.today_up,true);
                  }}>Today {todayArrow}</li>

              </ul>
              {stocks}
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default StockIndex;
