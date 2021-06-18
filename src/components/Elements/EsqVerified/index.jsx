import React from 'react';
import classnames from 'classnames';
import st from './verified.module.scss';

import { ReactComponent as Logo } from 'assets/img/logo-small.svg';

const EsqVerified = ({className, ...props}) => {
  return (
    <span
      {...props}
      className={classnames(st.container, className)}
    >
      <Logo />
      <span>verified</span>
    </span>
  );
};

export default EsqVerified;