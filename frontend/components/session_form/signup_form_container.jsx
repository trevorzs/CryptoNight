import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {signup} from '../../actions/session_actions';
import SessionForm from './session_form';

const msp = (state) => (
  {
    username:"",
    password:""
  }
);
const mdp = (dispatch) => (
  {
    processForm: user => dispatch(signup(user))
  }
);

export default connect(msp,mdp)(SessionForm);
