import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';


class WelcomePage extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    let content;
    if (this.props.loggedIn){
      content =
      (<Redirect to={this.props.link}/>)
    }else{
      content =
    ( <div className="splash">
      <div className="splash-content">
        <h1 className="splash-title">CryptoNight</h1>
        <div className="splash-text">
          <h2>Invest in Bitcoin & other cryptocurrencies,</h2>
            <h2>24/7 & commission-free using CryptoNight.</h2>
        </div>
        <div onClick={this.props.demoLogin} className="splash-login">
          <span>Demo Login</span>
        </div>
      </div>
        <nav className="splash-navbar">
          <div/>
          <div className="navlinks">
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </nav>
      </div>
    )
    }
    return (
      <div className="fullsize">
        {content}
      </div>
    )
  }
}

export default WelcomePage;
