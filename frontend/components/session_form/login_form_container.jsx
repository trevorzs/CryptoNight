import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {login,logout,clearErrors} from '../../actions/session_actions';
import LoginForm from './login_form';

const msp = (state) => (
  {
    errors: state.errors.session,
    button: "Sign In",
    link: <Link className="sessionlink" to="/signup">Don't have an account? Sign up now</Link>
  }
);

const mdp = (dispatch) => (
  {
    processForm: user => dispatch(login(user)),
    logout: () => dispatch(logout()),
    clearErrors: () => dispatch(clearErrors()),
    demoLogin: () => {
      const user = {username:"Potential_Cryptonaut", password:"starwars"}
      return (dispatch(login(user)))
    }
  }
);

export default connect(msp,mdp)(LoginForm);
