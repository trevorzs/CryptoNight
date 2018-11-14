import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {login,logout,clearErrors} from '../../actions/session_actions';
import SessionForm from './session_form';

const msp = (state) => (
  {
    errors: state.errors.session,
    button: "Sign In",
    link: <span className="sessionlink"><Link to="/signup">Don't have an account? Sign up now</Link></span>
  }
);

const mdp = (dispatch) => (
  {
    processForm: user => dispatch(login(user)),
    logout: () => dispatch(logout()),
    clearErrors: () => dispatch(clearErrors())
  }
);

export default connect(msp,mdp)(SessionForm);
