import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {merge} from 'lodash';
import {connect} from 'react-redux';
import NavbarContainer from '../navbar/navbar_container';



class Loading extends React.Component{

  render(){
    return(
      <div className="overall fullsize">
        <div className="displace">
          <div id="gradient" className="gradient">
          </div>
        </div>
        <NavbarContainer/>
        <div className="main-wrapper">
          <div className="stock-show-main">
            <h1>LOADING</h1>
          </div>
        </div>
      </div>
    )
  }
}

  export default Loading;
