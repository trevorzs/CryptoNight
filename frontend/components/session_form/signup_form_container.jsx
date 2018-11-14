import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {login,signup,clearErrors} from '../../actions/session_actions';
import SignupForm from './signup_form';

const msp = (state) => (
  {
    errors: state.errors.session,
    button: "Sign Up",
    link:  <Link className="sessionlink" to="/login">Already have an account? Sign in now</Link>,
  }
);
const mdp = (dispatch) => (
  {
    processForm: user => dispatch(signup(user)),
    clearErrors: () => dispatch(clearErrors()),
    demoLogin: () => {
      const user = {username:"Potential_Cryptonaut", password:"starwars"}
      return (dispatch(login(user)))
    }
  }
);

export default connect(msp,mdp)(SignupForm);
