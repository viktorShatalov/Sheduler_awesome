import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import st from './favoriteItem.module.scss';

import Icon from 'components/UI/Icon';
import LazyLoadImg from 'components/UI/LazyLoadImg';
import Rating from 'components/UI/Rating';
import FreeTime from 'components/Elements/FreeTime';

import mergeSelected from 'helpers/prepareFromSelect';

const RATING = 4.5;
const FREE_TIME = 15;

const FavoriteItem = ({favorite, onCancel}) => {
  let lawyer = favorite.lawyer;
  let company = lawyer.company[0];

  return (
    <div className={st.item}>
      <button
        type="button"
        className={st.cancel}
        onClick={() => onCancel(favorite.id)}
      >
        <Icon name="delete" />
      </button>
      <div className={st.user}>
        <Rating
          className={st.rating}
          rating={RATING}
        />
        <Link to={`/view-profile/${lawyer.slug}`}>
          <LazyLoadImg
            alt={`${lawyer.first_name} ${lawyer.last_name}`}
            src={lawyer.avatar}
            effect="blur"
            className={st.avatar}
          />
        </Link>
        <div className={st.right}>
          <div className={st.row}>
            <Link to={`/view-profile/${lawyer.slug}`}>
              <span className={st.name}>{lawyer.first_name} {lawyer.last_name}</span>
            </Link>
            <FreeTime 
              time={`${FREE_TIME} min`}
              className={st.free}
              showText={false}
            />
          </div>
          <div className={st.row}>
            <span className={classnames(st.text, st.disabled)}>{company.city}, {company.state.code}</span>
            <span className={classnames(st.text, st.disabled)}>lisenced for {new Date().getFullYear() - Number(Math.min(...lawyer.licenses.map(i => i.year), new Date().getFullYear()))} years</span>
          </div>
          <div className={st.row}>
            <span className={st.text}>{mergeSelected(lawyer.service.occupations)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;