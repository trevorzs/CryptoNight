import React from 'react';
import {connect} from 'react-redux';
import Dashboard from './dashboard';

const msp = (state, ownProps) => {
  return (
    {
      currentUser: state.entities.users[state.session.id],
      portfolios: state.entities.portfolios
    }
  )
}


const mdp = dispatch => (
  {
  }
);


export default connect(msp,mdp)(Dashboard);
