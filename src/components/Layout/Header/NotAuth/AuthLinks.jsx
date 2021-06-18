import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import classnames from 'classnames';
import st from './authLinks.module.scss';

const AuthLinks = () => {
  return (
    <Fragment>
      <li className={classnames(st.auth_nav_item)}>
        <p className="esq-semi">For lawyers</p>
        <p>
          <NavLink to={'/lawyer/sign-in'} className={'esq-text'}>Log in</NavLink>

          <NavLink to={'/lawyer/search-account'} className={'esq-text'}>Sign up</NavLink>
        </p>
      </li>
      <li className={classnames(st.auth_nav_item)}>
        <p className="esq-semi">For users</p>
        <p>
          <NavLink to={'/user/sign-in'} className={'esq-text'}>Log in</NavLink>

          <NavLink to={'/user/sign-up'} className={'esq-text'}>Sign up</NavLink>
        </p>
      </li>
    </Fragment>
  );
};

export default AuthLinks;