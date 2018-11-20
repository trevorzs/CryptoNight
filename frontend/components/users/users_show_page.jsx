import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';
import NavbarContainer from '../navbar/navbar_container';


class UserShowPage extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="overall fullsize">
        <div className="displace">
          <div className="gradient">
          </div>
        </div>
        <NavbarContainer />
        <div className="user-show-main">
          <h1>Welcome to CryptoNight</h1>
          <Link className="user-show-tag" to="/stocks">Cryptocurrencies</Link>
        </div>

      </div>
    )
  }
}

export default UserShowPage;
