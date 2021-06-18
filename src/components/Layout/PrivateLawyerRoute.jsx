import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateLawyerRoute = ({ component: Component, roles, isMobile, history, ...rest }) => (
  <Route
    {...rest}
    history={history}
    exact
    render={props => {
      const currentUser = localStorage.getItem('mode');

      if (!currentUser) {
          // not logged in so redirect to login page with the return url
          return <Redirect to={{ pathname: '/lawyer/sign-in', state: { from: props.location } }} />
      }

      // check if route is restricted by role
      if (roles && roles.indexOf(currentUser) === -1) {
          // role not authorised so redirect to user start page
          return <Redirect to={{ pathname: '/'}} />
      }

      // authorised so return component
      return <Component {...props} key={Date.now()} isMobile={isMobile} />
  }} />
)

export default PrivateLawyerRoute;