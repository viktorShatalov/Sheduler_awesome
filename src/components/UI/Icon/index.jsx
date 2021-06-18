import React from 'react';
import classnames from 'classnames';
import Icons from 'assets/img/icons.svg';
import './styles.scss';

const Icon = ({name, className, ...propses}) => (
  <svg className={classnames(`esq-icon esq-icon--${name}`, className)} {...propses}>
    <use 
      xlinkHref={`${Icons}#icon-${name}`} 
      width="100%" 
      height="100%"
    />
  </svg>);

export default Icon;