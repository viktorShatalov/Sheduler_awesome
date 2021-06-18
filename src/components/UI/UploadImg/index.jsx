import React, { useState, useEffect } from 'react';

import ImgPlaceholder from 'assets/img/image-placeholder.svg';

const accepted = ['image/gif', 'image/jpeg', 'image/png'];

const UploadImg = ({className, src, alt, onChange, err, ...props}) => {
  const [loaded, setLoaded] = useState(false);
  const [image, setImage] = useState(src || ImgPlaceholder);
  const [ error, setError ] = useState();

  useEffect(() => {
    src && setImage(src);
  }, [src]);

  useEffect(() => {
    if (err) {
      setError(err);

      setTimeout(() => {setError();}, 3000);
    }
  }, [err])

  const handlerInput = (event) => {
    const file = event.target.files[0];

    if (file.size/1000000 > 10 || !accepted.includes(file.type)) {
      setError('Image should be less than 10mb');

      setTimeout(() => {setError();}, 3000);
      return;
    }

    console.log(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
    if (onChange && typeof onChange === 'function') onChange(event.target.files[0]);
  };

  const handlerLoad = () => {
    setLoaded(true);
  };

  const handlerError = (e) => {
    setImage(ImgPlaceholder);
  };

  return (
    <p style={{position: 'relative'}}>
    <label className={className} title="Upload" style={{backgroundColor: '#CECECE', fontSize: '0'}}>
      <input type="file" onChange={handlerInput} hidden />
      <img
        { ...props }
        src={image}
        style={{objectFit: 'cover', objectPosition: 'center', height: '100%', width: '100%', opacity: +loaded}}
        onLoad={handlerLoad}
        onError={handlerError}
        alt={alt}
      />
    </label>
    {error && (
      <span 
        style={{
          position: 'absolute', 
          top: '36px', 
          left: 0, 
          right: 0, 
          color: 'red', 
          fontSize: '14px',
          fontWeight: 600,
          backgroundColor: '#FFFFFF',
          textAlign: 'center'
        }}>{error}</span>
      )}
    </p>
  );
};

export default UploadImg;