import React from 'react';
import {connect} from 'react-redux';
import WelcomePage from './welcome_page';
import {login,logout} from '../../actions/session_actions';

const msp = state => (
  {
    loggedIn: Boolean(state.session.id),
    currentUser: state.entities.users[state.session.id],
    link: `/users/${state.session.id}`
  }
);

const mdp = dispatch => (
  {
    logout: () => dispatch(logout()),
    demoLogin: () => {
      const user = {username:"Potential_Cryptonaut", password:"starwars"}
      return (dispatch(login(user)))
    }
  }
);


export default connect(msp,mdp)(WelcomePage);
