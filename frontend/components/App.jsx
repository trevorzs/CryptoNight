import React from 'react';
import {Route} from 'react-router-dom';
import {AuthRoute, ProtectedRoute, DashboardRoute} from '../util/route_util';
import SignupFormContainer from './session_form/signup_form_container';
import LoginFormContainer from './session_form/login_form_container';
import StockIndexContainer from './stocks/stock_index_container';
import StockShowContainer from './stocks/stock_show_container';

const App = () => (
  <div className="main fullsize">
    <AuthRoute exact path="/signup" component={SignupFormContainer}/>
    <AuthRoute exact path="/login" component={LoginFormContainer}/>
    <ProtectedRoute exact path="/stocks" component={StockIndexContainer}/>
    <ProtectedRoute exact path="/stocks/:stock_id" component={StockShowContainer}/>
    <DashboardRoute exact path="/"/>
  </div>
)
export default App;
