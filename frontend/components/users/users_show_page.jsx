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
          <img src="images/telescope.svg" className="logo"/>
            <div className="nav-links">
              <Link to={this.props.homeLink} className="nav-link-a">Home</Link>
              <a className="nav-link-a">Notifications</a>
              <button className="nav-link-a" onClick={this.props.logout}>Log Out</button>
            </div>
        </div>
        <div className="user-show-main fullsize">
          <h1>Welcome to CryptoNight</h1>
      
        </div>

      </div>
    )
  }
}

export default UserShowPage;