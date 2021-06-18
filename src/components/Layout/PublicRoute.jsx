import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, roles, isMobile, history, ...rest }) => (
  <Route 
    {...rest}
    history={history}
    exact
    render={props => {
      const currentUser = localStorage.getItem('mode');

      if ((currentUser && rest.notFor) && rest.notFor.indexOf(currentUser) > -1) {
        // role not authorised so redirect to start page
        return <Redirect to={{ pathname: '/'}} />
      }

      return <Component {...props} key={Date.now()} isMobile={isMobile} />
    }}
  ></Route>
)

export default PublicRoute;