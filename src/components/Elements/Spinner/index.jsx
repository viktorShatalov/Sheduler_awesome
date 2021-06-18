import React from 'react';
import { CSSTransition } from 'react-transition-group';
import classnames from 'classnames';

import spinner from './spinner.module.scss';

const Spinner = ({className, isVisible}) => {
  return (
    <CSSTransition
      in={isVisible}
      classNames="spinner-hide"
      timeout={{
        enter: 400,
        exit: 500
      }}
      unmountOnExit
    >
      <div className={classnames(spinner.container, className)}>
        <p>
          <span></span>
          <span></span>
          <span></span>
        </p>
      </div>
    </CSSTransition>
  );
};

export default Spinner;