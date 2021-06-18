import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import LazyLoadImg from 'components/UI/LazyLoadImg';

import mergeSelected from 'helpers/prepareFromSelect';
import getLicenseSinceYear from 'helpers/getLicenseSinceYear';

import st from './lawyerInfo.module.scss';
import FreeTime from '../FreeTime';
import Rating from 'components/UI/Rating';
import Icon from 'components/UI/Icon';

const RATING = 4.5;
const Reviews = 6;

const LawyerInfo = ({lawyer}) => {
  const name = `${lawyer.first_name} ${lawyer.last_name}`;
  return (
    <div className={st.lawyer_info}>
      <div className={st.lawyer_avatar}>
        <Link to={`/view-profile/${lawyer.slug}`}>
          <LazyLoadImg
            alt={name}
            src={lawyer.avatar}
            effect="blur"
          />
        </Link>
      </div>
      <div className={st.top}>
        {/* <div className={st.lawyer_rating}>
          <Rating
            className={st.lawyer_rating_stars}
            rating={RATING}
          />
          <p className={classnames(st.lawyer_rating_number)}>
            <span className={'esq-semi'}>{RATING}</span>, {Reviews} Reviews
          </p>
        </div> */}
        <div className={st.lawyer_name}>
          <Link to={`/view-profile/${lawyer.slug}`}>
          {name}
          </Link>
          {
            lawyer.service.free &&
            <FreeTime 
              time={`${lawyer.service.free} min`}
              className={st.lawyer_free}
            />
          }
          
        </div>
        <p className={st.lawyer_ocupation}>
          {mergeSelected(lawyer.service.occupations)}
        </p>

        <p className={st.lawyer_licensed}>
          <Icon name="document" /> Licensed for <strong>{ getLicenseSinceYear(lawyer.licenses) }</strong> years
        </p>

        <p className={st.lawyer_details}>{lawyer.company[0].address}, {lawyer.company[0].city}, {lawyer.company[0].country.name}
        </p>
      </div>
    </div>
  );
};

export default LawyerInfo;