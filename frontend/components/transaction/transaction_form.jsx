import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';
import Loading from '../loading/loading';
import TransactionFormContainer from '../transaction/transaction_form_container';

class TransactionForm extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      user_id: this.props.currentUser.id,
      stock_id: this.props.stock.id,
      price: "",
      amount: "",
      cost: "0",
      sell: false,
      message: null
    }
  }

  componentDidMount(){
    const currentUserId = this.props.currentUser.id;
    const currentStockId = this.props.stock.id;
    const func = this.props.findShares;
    this.props.fetchPrice(this.props.stock.symbol,this.props.stock.id);
    this.props.findAllShares(currentUserId);
  }
  componentWillUnmount(){
    this.props.needsLoading();
  }

  handleSubmit(e){
    e.preventDefault();
    const transaction = Object.assign({},this.state);
    transaction.price = this.props.data.price;
    transaction.amount = parseInt(transaction.amount);
    if (this.state.sell === true){
      transaction.amount = (-1 * transaction.amount);
      if ((this.props.shares[this.props.stock.id] + transaction.amount)>=0){
        if (this.props.shares[this.props.stock.id] + transaction.amount === 0){
          this.setState({sell:false, message:"Transaction Successful"});
        }else{
          this.setState({message:"Transaction Successful"});
        }
        this.props.addTransaction(transaction,this.props.currentUser);
      }else{
        this.setState({message:"You don't own that many shares"})
      }
    }else{
      if (this.props.currentUser.funds > transaction.amount*transaction.price){
        this.props.addTransaction(transaction,this.props.currentUser);
        this.setState({message:"Transaction Successful"})
      }else{
        this.setState({message:"Insufficient funds"})
      }
    }
    this.setState({
      user_id: this.props.currentUser.id,
      stock_id: this.props.stock.id,
      price: "",
      amount: "",
      funds: this.props.currentUser.funds
    });
  }

  round(number, places){
    return +(Math.round(number + "e+" + places)  + "e-" + places);
  }


  update(field){
    return (e) => this.setState({
      [field]: e.target.value,
      cost: `$${this.round((e.target.value*this.props.data.daily[this.props.data.daily.length-1].close),4)}`
    });
  }

  render(){
    let price, shares;
    let bb, sb, buttonval;
    let transactionFormButton, inputfield, activeclass;
    if (this.props.button){
      transactionFormButton = this.props.button;
      if (this.props.button === "transaction-form-btn-up"){
        inputfield = "transaction-input-field-up";
        activeclass = "transaction-active-up";
      }else{
        inputfield = "transaction-input-field";
        activeclass = "transaction-active";
      }
    }else{
      transactionFormButton = "transaction-form-btn-down";
      activeclass = "transaction-active";
      inputfield = "transaction-input-field";
    }
    if (this.props.data.daily){
      price = this.props.data.daily[this.props.data.daily.length-1].close;
    }else{
      price = "loading";
    }
    if (this.state.sell === false){
      buttonval = "Buy";
      bb = activeclass;
      shares = (
        <h2 className="transaction-ownership-detail">${this.round(this.props.currentUser.funds,4)} Buying Power Available</h2>
      )
    }else{
      buttonval = "Sell";
      sb = activeclass;
      if (this.props.shares[this.props.stock.id] > 1){
        shares = (
          <h2 className="transaction-ownership-detail">{this.props.shares[this.props.stock.id]} Shares Available</h2>
        )
      }else{
        shares = (
          <h2 className="transaction-ownership-detail">{this.props.shares[this.props.stock.id]} Share Available</h2>
        )
      }

    }
    if (this.props.shares[this.props.stock.id]){
      sb = (
        <h2 className={sb} onClick={()=>this.setState({sell: true, message: ""})}>Sell</h2>
      )
    }else{
      sb = (
        <h2></h2>
      )
    }
    let message;
    if (this.state.message === "Transaction Successful"){
      message = (<p class="transaction-success">{this.state.message}</p>);
    }else{
      message = (<p class="transaction-error">{this.state.message}</p>);
    }
    return(
        <form className="transaction-form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="transaction-options">
            <h2 className={bb} onClick={()=>this.setState({sell: false, message:""})}>Buy</h2>
            {sb}
          </div>
          <div className="transaction-input">
            <h2 className="transaction-input-title">Shares</h2>
            <input className={inputfield} type="number" min="1" max="500000" onChange={this.update("amount")} value={this.state.amount} placeholder="0" required></input>
          </div>
          <div className="transaction-input">
            <h2 className="transaction-detail">Market Price: </h2>
            <h2>{price}</h2>
          </div>
          <div className="transaction-input">
            <h2 className="transaction-detail">Estimated Cost:</h2>
            <h2> {this.state.cost}</h2>
          </div>
          <input className={transactionFormButton} type="submit" value={buttonval}></input>
            <div className="transaction-ownership">
              {shares}
              {message}
            </div>

        </form>

    )

  }
}

export default TransactionForm;
