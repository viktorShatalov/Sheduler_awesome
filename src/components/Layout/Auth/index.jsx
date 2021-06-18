import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import st from './authWrap.module.scss';

// import { ReactComponent as Logo } from 'assets/img/logo.svg';

const AuthLayout = ({ className, children }) => (
    <div className={classnames(st.container, className)}>
      {/* <p className={st.logo} >
        <Logo />
      </p> */}
      <div className="esq-wrap">
        <div className={st.inner}>
          { children }
        </div>
      </div>
      
    </div>
);

AuthLayout.propTypes = {
  className: PropTypes.string,
  // children: PropTypes.element,
}

AuthLayout.defaultProps = {
  className: null,
  // children: null,
};

export default AuthLayout;
