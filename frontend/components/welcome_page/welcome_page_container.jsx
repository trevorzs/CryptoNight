import React from 'react';
import {connect} from 'react-redux';
import WelcomePage from './welcome_page';
import {logout} from '../../actions/session_actions';

const msp = state => (
  {
    loggedIn: Boolean(state.session.id),
    currentUser: state.entities.users[state.session.id],
    link: `/users/${state.session.id}`
  }
);

const mdp = dispatch => (
  {
    logout: () => dispatch(logout())
  }
);


export default connect(msp,mdp)(WelcomePage);
