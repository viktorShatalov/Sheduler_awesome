import React, { Fragment, useEffect, useCallback } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import classnames from 'classnames';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from 'redux-store/actions';

import { CSSTransition } from 'react-transition-group';
import Notifications from '../Notifications/index';
import Icon from 'components/UI/Icon';

import imgPlaceholder from 'assets/img/image-placeholder.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import NavLinks from 'setts/nav-links';

const HeaderLawyer = ({isMobile = true, isOpen, logoutLawyer, getLawyerProfile, st, profile}) => {
  const history = useHistory();
  const links = NavLinks.lawyer;

  history.listen((location, action) => {
    let loc = links.find(link => link.path === location.pathname);

    if (loc)
      localStorage.setItem('lawyer-path', loc.path);
  });

  useEffect(() => {
    getLawyerProfile()
      .catch(err => {
        if (err.status === 401) {
          logoutLawyer();
          history.push({
            pathname: '/lawyer/sign-in'
          });
        }
      });
  }, []);

  const logout = () => {
    history.push({
      pathname: '/lawyer/sign-in'
    });

    logoutLawyer();
  };

  const list = () => {
    return (
      <nav className={classnames(st.nav, 'esq-auth')}>
        <ul className={st.navInner}>
          {links.map(link => (
            <li
              key={link.id} 
              className={classnames('esq-semi', st.navItem)}
            >
              <NavLink to={link.path} className={'esq-text'}>{link.title}</NavLink>
            </li>
          ))}
          {/* <li className={classnames('esq-semi', st.navItem)}>
            <NavLink to={'/lawyer/profile'} className={'esq-text'}>Profile</NavLink>
          </li>
          <li className={classnames('esq-semi', st.navItem)}>
            <NavLink to={'/lawyer/schedule'} className={'esq-text'}>Schedule</NavLink>
          </li>
          <li className={classnames('esq-semi', st.navItem)}>
            <NavLink to={'/lawyer/video-chat'} className={'esq-text'}>Video</NavLink>
          </li> */}
        </ul>
      </nav>
    )
  };

  const userInfo = () => {
    const fullName = profile && `${profile.first_name} ${profile.last_name}`;

    return (
      <div className={st.user_profile}>
        <Link to={'/lawyer/profile'} className={st.user}>
          <div className={st.avatar}>
            <LazyLoadImage
              alt={fullName}
              src={profile && (profile.avatar || imgPlaceholder)}
              effect="blur"
              height="40"
              width="40"
              placeholderSrc={imgPlaceholder}
            />
          </div>
          <div className={st.name}>
            <p
              className={classnames(st.userName, 'esq-semi')}
              title={fullName}
            >{fullName}</p>
            <p className={st.userRole}>Lawyer</p>
          </div>
        </Link>
        <p className={st.logout_wrap}>
          <button
            onClick={logout}
            className={st.logout}
          >
            <Icon name="logout" />
          </button>
        </p>
      </div>
    );
  };

  const desktopState = () => {
    return (
      <Fragment>
        { list() }
        <div className={st.profile}>
          <Notifications
            isMobile={isMobile}
            isLawyer={true}
          />

          { userInfo() }
        </div>
      </Fragment>
    );
  };

  const mobileState = () => {
    return (
      <Fragment>
        <Notifications
          isMobile={isMobile}
          isLawyer={true}
        />
        <CSSTransition
          in={isOpen}
          classNames="slide-down"
          timeout={{
            enter: 400,
            exit: 200
          }}
          unmountOnExit
        >
          <div className={st.popup}>
            { userInfo() }
            { list() }
          </div>
        </CSSTransition>
      </Fragment>
    );
  };

  return isMobile ? mobileState() : desktopState();
};

const mapStateToProps = ({ ref, lawyer }) => ({
  profile: lawyer.profile.data.info,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  logoutLawyer: actions.logoutLawyer,
  getLawyerProfile: actions.getLawyerProfile
}, dispatch)

const mapToProps = connect(mapStateToProps,mapDispatchToProps);

export default mapToProps(HeaderLawyer);