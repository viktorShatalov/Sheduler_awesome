import React from 'react';
import classnames from 'classnames';

import Icon from 'components/UI/Icon';

import st from './timezone.module.scss';

const TimeZone = ({className, ...props}) => {
  return (
    <p className={classnames(className, 'esq-primary', st.container)}>
      <svg id="icon-info" width="100%" height="100%" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="10" fill="currentColor"></circle>
        <path fill="#FFFFFF" d="M10.972 11.652V6H8.956v5.652h2.016zm.168 1.824c0-.624-.528-1.128-1.176-1.128-.648 0-1.164.516-1.164 1.14 0 .636.54 1.128 1.164 1.128.648 0 1.176-.504 1.176-1.14z"></path>
      </svg>
      Based on your time zone {window.currentTimeZone}
    </p>
  );
};

export default TimeZone;