import React, { Fragment, useState, useRef, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import classnames from 'classnames';
import Icon from 'components/UI/Icon';
import AuthLinks from './AuthLinks';

import authST from './authLinks.module.scss';

import { CSSTransition } from 'react-transition-group';

const HeaderNotAuth = ({ isMobile = true, st, isOpen, history }) => {
  const [ openAuth, setOpenAuth ] = useState(false);
  const popup = useRef();
  const btnAuth = useRef();

  useEffect(() => {
    const handlerClickOut = (event) => {
        if (popup.current && !popup.current.contains(event.target) && !btnAuth.current.contains(event.target)) {
            setOpenAuth(false);
        }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handlerClickOut);
    return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handlerClickOut);
    };
  }, [popup]);

  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      setOpenAuth(false);
    });

    return () => {
      unlisten();
    }
  });

  const handlerToogleAuthPopup = (e) => {
    setOpenAuth(!openAuth);
  };

  return (
    <Fragment>
      {
        isMobile ?
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
              <nav className={classnames(st.nav, 'esq-no-auth')}>
                <ul className={st.navInner}>
                  <AuthLinks />
                </ul>
              </nav>
            </div>
          </CSSTransition>
          :
          (
            <div className={classnames(authST.auth)}>
              <NavLink
                to={'/lawyer/search-account'}
                className={classnames(authST.auth_btn, authST.delimiter)}
              >List your practice on EsqFind</NavLink>
              <button
                type="button"
                ref={btnAuth}
                className={classnames(authST.auth_btn, {[authST.auth_btn_open]: openAuth})}
                onClick={handlerToogleAuthPopup}
              >Log in / Sign up
                <Icon name="arrow-down" />
              </button>

              <CSSTransition
                in={openAuth}
                classNames="show"
                timeout={{
                  enter: 400,
                  exit: 200
                }}
                unmountOnExit
              >
              <nav
                className={classnames(authST.auth_nav, 'no-esq-auth')}
                ref={popup}
              >
                <ul className={authST.auth_inner}>

                  <AuthLinks />

                </ul>
              </nav>
              </CSSTransition>
            </div>
          )
      }
    </Fragment>
  );
};

export default withRouter(HeaderNotAuth);