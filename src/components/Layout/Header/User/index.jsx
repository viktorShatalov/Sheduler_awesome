import React, { Fragment, useEffect } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import classnames from 'classnames';

import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from 'redux-store/actions';

import { CSSTransition } from 'react-transition-group';
import Notifications from '../Notifications/index';
import Favorites from '../Favorites/index';
import Icon from 'components/UI/Icon';

import imgPlaceholder from 'assets/img/image-placeholder.svg';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import NavLinks from 'setts/nav-links';

const HeaderUser = ({isMobile = true, isOpen, logoutUser, getUserProfile, st, profile}) => {
  const history = useHistory();
  const links = NavLinks.user;

  history.listen((location, action) => {
    let loc = links.find(link => link.path === location.pathname);

    if (loc)
      localStorage.setItem('user-path', loc.path);
  });

  useEffect(() => {
    getUserProfile()
      .catch(err => {
        if (err.status === 401) {
          logoutUser();
          history.push({
            pathname: '/user/sign-in'
          });
        }
      })
  }, []);

  const logout = () => {
    history.push({
      pathname: '/user/sign-in'
    });

    logoutUser();
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
            <NavLink to={'/user/profile'} className={'esq-text'}>Profile</NavLink>
          </li>
          <li className={classnames('esq-semi', st.navItem)}>
            <NavLink to={'/user/session-history'} className={'esq-text'}>Session History</NavLink>
          </li>
          <li className={classnames('esq-semi', st.navItem)}>
            <NavLink to={'/user/video-chat'} className={'esq-text'}>Video</NavLink>
          </li> */}
        </ul>
      </nav>
    )
  };

  const userInfo = () => {
    const fullName = profile && `${profile.first_name} ${profile.last_name}`;

    return (
      <div className={st.user_profile}>
        <Link to={'/user/profile'} className={st.user}>
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
            <p className={st.userRole}>User</p>
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
          <Favorites
            isMobile={isMobile}
          />

          <Notifications
            isMobile={isMobile}
            isLawyer={false}
          />

          { userInfo() }
        </div>
      </Fragment>
    );
  };

  const mobileState = () => {
    return (
      <Fragment>
        <Favorites
          isMobile={isMobile}
        />
        <Notifications
          isMobile={isMobile}
          isLawyer={false}
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

const mapStateToProps = ({ ref, user }) => ({
  profile: user.profile.data,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  logoutUser: actions.logoutUser,
  getUserProfile: actions.getUserProfile
}, dispatch)

const mapToProps = connect(mapStateToProps,mapDispatchToProps);

export default mapToProps(HeaderUser);