import React from 'react';
import classnames from 'classnames';
import ReactStars from "react-rating-stars-component";

import st from './raiting.module.scss';

const Raiting = ({ className, rating=0, onChange = null, ...props }) => {
  const isEdit = onChange && typeof onChange === 'function';

  const ratingChanged = (newRating) => {
    console.log(newRating);
    onChange(newRating);
  };

  return (
    <div className={classnames(st.container, className)}>
      {/* <ReactStars
        value={rating}
        edit={isEdit}
        count={5}
        onChange={ratingChanged}
        size={16}
        isHalf={true}
        color="#EBEEEE"
        activeColor="#FDDC03"
      /> */}
    </div>
  );
};

export default Raiting;