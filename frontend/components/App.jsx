import React from 'react';
import {Route} from 'react-router-dom';
import {AuthRoute, ProtectedRoute} from '../util/route_util';
import SignupFormContainer from './session_form/signup_form_container';
import LoginFormContainer from './session_form/login_form_container';
import WelcomePageContainer from "./welcome_page/welcome_page_container";

const App = () => (
  <div className="main fullsize">
    <AuthRoute exact path="/signup" component={SignupFormContainer}/>
    <AuthRoute exact path="/login" component={LoginFormContainer}/>
    <Route exact path="/" component={WelcomePageContainer}/>
  </div>
)
export default App;
