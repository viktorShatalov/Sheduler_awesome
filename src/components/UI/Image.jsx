import React from 'react';

const Image = ({src, alt, ...props}) => {
  const isWebp = window.supportWebP;

  const { webp, fall } = src;

  return (
    <img
      src={isWebp ? (webp || fall) : fall}
      {...props}
      alt={alt}
    />
  );
};

export default Image;