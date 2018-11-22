import React from 'react';
import {connect} from 'react-redux';
import Movers from './movers';
import {logout} from '../../actions/session_actions';

const msp = (state, ownProps) => {
  return (
    {
      stocks: Object.keys(state.entities.stocks).map((stockid)=>(state.entities.stocks[stockid]))
    }
  )
}



export default connect(msp)(Movers);
