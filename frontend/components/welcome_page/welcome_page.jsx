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
      <h1 className="splash-title">CryptoNight</h1>
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
