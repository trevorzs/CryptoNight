import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';


class UserShowPage extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
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
        <div className="user-show-main">
          <h1>Welcome to CryptoNight</h1>
          <Link className="user-show-tag" to="/stocks">Cryptocurrencies</Link>
        </div>

      </div>
    )
  }
}

export default UserShowPage;
