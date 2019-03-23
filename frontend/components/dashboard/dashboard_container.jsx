import React from 'react';
import {connect} from 'react-redux';
import Dashboard from './dashboard';

const msp = (state, ownProps) => {
  return (
    {
      portfolios: state.entities.portfolios
    }
  )
}


const mdp = dispatch => (
  {
  }
);


export default connect(msp,mdp)(Dashboard);
