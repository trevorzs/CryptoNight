import React from 'react';
import {Route} from 'react-router-dom';
import SignupFormContainer from './session_form/signup_form_container';
import LoginFormContainer from './session_form/login_form_container';
import SessionForm from './session_form/session_form';

const App = () => (
  <div>
    <h1>Welcome to CryptoNight</h1>
    <Route path="/signup" component={SignupFormContainer}/>
    <Route path="/login" component={LoginFormContainer}/>
    <Route exact path="/" component={SessionForm}/>
  </div>
)
export default App;
