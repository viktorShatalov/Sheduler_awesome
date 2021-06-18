import React, { useState, useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { NavLink, withRouter, useLocation } from 'react-router-dom';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'redux-store/actions';

import st from './styles.module.scss';
import specific from './specificHeader.module.scss';
import HeaderNotAuth from './NotAuth';
import HeaderLawyer from './Lawyer';
import HeaderUser from './User';
import getRoleByURL from 'helpers/getRoleByURL';

import { ReactComponent as Logo } from 'assets/img/logo.svg';

import hiddenHeaderPath from 'setts/hiddenHeader';

const pathPagesSpecific = ['/'];

const checkSpecifHeader = (path) => pathPagesSpecific.includes(path);
const hideHeader = (path) => hiddenHeaderPath.some(url => path.indexOf(url) > -1);

const Header = ({isMobile = true, location, history, ...props}) => {
  const [isOpen, setOpen] = useState(false);
  const [isSpecifHeader, setSpecifHeader] = useState(checkSpecifHeader(useLocation().pathname));
  const [isHidden, setHidden] = useState(hideHeader(useLocation().pathname));

  const ref = React.useRef(null);

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      enableBodyScroll();
      setOpen(false);
      
      setSpecifHeader(checkSpecifHeader(location.pathname));

      setHidden(hideHeader(location.pathname));
    });

    return () => {
      unlisten();
    }
  });

  const togglePopup = () => {
    if (!isOpen) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
    setOpen(!isOpen);
  };

  const outBasicHeader = () => {
    return (
      <header
        ref={ref}
        className={classnames(st.container, {[st.mobileState]: isMobile})}
      >
        <div className="esq-wrap">
          <div className={st.inner}>
            <p className={st.logo}><NavLink to={'/'}><Logo /></NavLink></p>

            { localStorage.getItem('token') ?
            (
              // getRoleByURL(location.pathname) === 'lawyer' ?
              localStorage.getItem('mode') === 'lawyer' ?
              <HeaderLawyer isMobile={isMobile} st={st} isOpen={isOpen} />
              :
              <HeaderUser isMobile={isMobile} st={st} isOpen={isOpen} />
            )
            :
            <HeaderNotAuth isMobile={isMobile} st={st} isOpen={isOpen} />
            }

            {isMobile &&
              <p className={st.burger_wrap}>
                <button
                  type="button"
                  className={classnames(st.burger, {[st.openBurger]: isOpen})}
                  onClick={togglePopup}
                ></button>
              </p>
            }
          </div>
        </div>
      </header>
    );
  };

  const outSpecificHeader = () => {
    return localStorage.getItem('token') ?
      (<header
        ref={ref}
        className={classnames(st.container, {[st.mobileState]: isMobile})}
      >
        <div className="esq-wrap">
          <div className={st.inner}>
            <p className={st.logo}><NavLink to={'/'}><Logo /></NavLink></p>

            { localStorage.getItem('token') ?
            (
              // getRoleByURL(location.pathname) === 'lawyer' ?
              localStorage.getItem('mode') === 'lawyer' ?
              <HeaderLawyer isMobile={isMobile} st={st} isOpen={isOpen} />
              :
              <HeaderUser isMobile={isMobile} st={st} isOpen={isOpen} />
            )
            :
            <HeaderNotAuth isMobile={isMobile} st={st} isOpen={isOpen} />
            }

            {/* { localStorage.getItem('token') ?
            <HeaderLawyer isMobile={isMobile} st={st} isOpen={isOpen} />
            :
            <HeaderNotAuth isMobile={isMobile} st={st} isOpen={isOpen} />
            } */}

            {isMobile &&
              <p className={st.burger_wrap}>
                <button
                  type="button"
                  className={classnames(st.burger, {[st.openBurger]: isOpen})}
                  onClick={togglePopup}
                ></button>
              </p>
            }
          </div>
        </div>
      </header>
    )
    :
    (
      <header
        ref={ref}
        className={classnames(specific.container, 'specific-state')}
      >
        <div className="esq-wrap">
          <HeaderNotAuth st={specific} isMobile={false} />
        </div>
      </header>
    );
  };

  return !isHidden && (isSpecifHeader ? outSpecificHeader() : outBasicHeader());
};

export default withRouter(Header);