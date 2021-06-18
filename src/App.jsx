import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import classnames from 'classnames';
import ScrollToTop from 'modules/ScrollToTop';


import moment from 'moment-timezone';

import Routers from './routers';

import { connect } from 'react-redux';
import * as actions from 'redux-store/actions';

import Header from 'components/Layout/Header';
import Loader from 'components/Elements/Loader/index';

import PrivateUserRoute from 'components/Layout/PrivateUserRoute';
import PrivateLawyerRoute from 'components/Layout/PrivateLawyerRoute';
import PublicRoute from 'components/Layout/PublicRoute';

import { bindActionCreators } from 'redux';
import ActionNotifs from 'components/Elements/ActionNotifs';


const iOS = navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

window.currentTimeZone = moment.tz(moment.tz.guess()).zoneAbbr();

const CheckRoute = (props) => {
  if (!props.role) return <PublicRoute {...props} />

  if (props.role.includes('user'))
    return <PrivateUserRoute roles={['user']} {...props} />

  if (props.role.includes('lawyer'))
    return <PrivateLawyerRoute roles={['lawyer']} {...props} />

  return <PublicRoute {...props} />
};

const App = (props) => {
  const [isMobile, setMobile] = useState(window.innerWidth <= 600);

  const handlerResize = () => {
    setMobile(window.innerWidth <= 600);
  };

  useEffect(() => {
    props.getFeeRetainer();
    props.getOccupations();
    props.getLanguage();
    props.getPayment();
    props.getState();
    props.getType();

    if (iOS) document.body.classList.add('iOS');

    handlerResize();

    window.addEventListener('resize', handlerResize, false);

    return () => {
      window.removeEventListener('resize', handlerResize);
    }
  });


  return (
    <div className={classnames('esq-app')}>
      <Router>
        <ScrollToTop />
        <Header isMobile={isMobile} />

        <ActionNotifs />

        <main className="esq-main">
          <React.Suspense fallback={<Loader />}>
            <Switch>
              {Routers.map(({ component: Cmp, ...route }, index) => (
                <CheckRoute
                  // key={index}
                  key={Date.now()}
                  exact
                  {...route}
                  // path={route.path}
                  component={Cmp}
                  isMobile={isMobile}
                  // render={props => <Cmp {...props} isMobile={isMobile} />}
                  history={useHistory}
                >
                </CheckRoute>

                // <Route 
                //   key={index}
                //   {...route}
                //   render={props => <Cmp {...props} isMobile={isMobile} />}
                //   history={useHistory}
                //   exact 
                // ></Route>
              ))}
            </Switch>
          </React.Suspense>
        </main>
      </Router>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(App);
