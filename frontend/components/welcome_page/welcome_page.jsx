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
      (<><h1> Hello, {this.props.currentUser.username}</h1>
      <button onClick={this.props.logout}>Logout</button></>)
    }else{
      content =
    ( <><h1>Welcome to Crypto Night</h1>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link></>
    )
    }
    return (
      <div>
        {content}
      </div>
    )
  }
}

export default WelcomePage;
