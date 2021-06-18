import React from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import st from './itemNotification.module.scss';

import eventsType from 'moks/eventsTypes';
import Icon from 'components/UI/Icon';
import LazyLoadImg from 'components/UI/LazyLoadImg';
import Rating from 'components/UI/Rating';
import moment from 'moment';

const RATING = 4.5;

const ItemNotification = ({notification, isLawyer, onCancel}) => {
  let user = notification.data.booking.user || notification.data.user;

  return (
    <div className={st.item}>
      <button
        type="button"
        className={st.cancel}
        onClick={() => onCancel(notification.id)}
      >
        <Icon name="delete" />
      </button>
      <div className={st.user}>
        <Rating
          className={st.rating}
          rating={RATING}
        />
        <LazyLoadImg
          alt={`${user.first_name} ${user.last_name}`}
          src={user.avatar}
          effect="blur"
          className={st.avatar}
        />
        <div className={st.right}>
          <span className={st.user}>{user.first_name} {user.last_name}</span>
          {notification.data.booking && (
            <p className={st.event}>
              {
                eventsType
                  .filter(ev => notification.data.booking.event_type.includes(ev.label))
                  .map(ev => (
                    <span
                      key={ev.id}
                      className={st.event_inner}
                    >
                      {ev.icon}
                      <span>{ev.label}</span>
                    </span>
                  ))
              }
            </p>
          )}
        </div>
      </div>
      <p className={classnames(st.title, 'esq-semi')}>
        <Link to={isLawyer ? '/lawyer/schedule' : '/user/session-history'}>{notification.data.title}</Link>
      </p>
      <p className={st.date}>{moment(notification.created_at).format('D MMMM, hh:mm A')}</p>
    </div>
  );
};

export default ItemNotification;