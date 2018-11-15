import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect, withRouter} from 'react-router-dom';
import UsersShowContainer from '../components/users/users_show_container';
import WelcomePageContainer from '../components/welcome_page/welcome_page_container';

const Auth = ({component: Component, path, exact, loggedIn}) => (
  <Route path={path} exact={exact} render={props => (
      loggedIn ? (
        <Redirect to="/"/>
      ) : (
        <Component {...props} />
      )
    )}/>
);

const Protected = ({component: Component, path, exact, loggedIn}) => (
  <Route path={path} exact={exact} render={props => (
      loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/"/>
      )
    )}/>
);

const Dashboard = ({path, exact, loggedIn}) => (
  <Route path={path} exact={exact} render={props => (
      loggedIn ? (
        <UsersShowContainer {...props} />
      ) : (
        <WelcomePageContainer {...props} />
      )
    )}/>
);

const msp = state => (
  {
    loggedIn: Boolean(state.session.id)
  }
);


export const AuthRoute = withRouter(connect(msp)(Auth));
export const ProtectedRoute = withRouter(connect(msp)(Protected));
export const DashboardRoute = withRouter(connect(msp)(Dashboard));
