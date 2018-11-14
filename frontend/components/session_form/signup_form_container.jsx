import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {signup,clearErrors} from '../../actions/session_actions';
import SessionForm from './session_form';

const msp = (state) => (
  {
    errors: state.errors.session,
    button: "Sign Up",
    link:  <span className="sessionlink"><Link to="/login">Already have an account? Sign in now</Link></span>,
  }
);
const mdp = (dispatch) => (
  {
    processForm: user => dispatch(signup(user)),
    clearErrors: () => dispatch(clearErrors())
  }
);

export default connect(msp,mdp)(SessionForm);
