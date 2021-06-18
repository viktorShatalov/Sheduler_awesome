import React from 'react';
import classnames from 'classnames';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import ImgPlaceholder from 'assets/img/image-placeholder.svg';

import st from './lazyloadimg.module.scss';
const LazyLoadImg = ({className, ...props}) => {
  return (
    <p className={st.wrap}>
      <LazyLoadImage
        {...props}
        placeholderSrc={ImgPlaceholder}
        className={classnames(st.img, className)}
        style={{objectFit: 'cover'}}
      />
    </p>
  );
};

export default LazyLoadImg;