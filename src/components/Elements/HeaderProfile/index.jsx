import React from 'react';
import classnames from 'classnames';
import st from './headerprofile.module.scss';

import Icon from 'components/UI/Icon';
import LazyLoadImg from 'components/UI/LazyLoadImg';

import EsqVerified from 'components/Elements/EsqVerified';

import UploadImg from 'components/UI/UploadImg';
import FavoriteBtn from 'components/Elements/FavoriteBtn';

import {CheckUserAuth} from 'helpers/auth';

const HeaderProfile = ({user, onChange, isLawyer=false, err=''}) => {
  const fullName = `${user.first_name} ${user.last_name}`;

  return (
    <div className={st.header}>
      <div className={st.header_avatarWrap}>
        {
          onChange ?
          <UploadImg
            src={user.avatar}
            alt={fullName}
            className={st.header_avatar}
            err={err}
            onChange={onChange}
          />
          :
          <LazyLoadImg
            alt={fullName}
            src={user.avatar}
            effect="blur"
            className={st.header_avatar}
          />
        }
      </div>

      <div className={st.header_row}>
        <p className={classnames(st.header_name, {[st.userName]: !isLawyer})}>{fullName}</p>
        {isLawyer && !CheckUserAuth('lawyer') && (
          <FavoriteBtn
            lawyer={user}
            className={st.header_favorite}
          />
        )}
      </div>

      {(isLawyer && user.city)&& <p className={st.header_city}>
        {[user.city, (user.state && user.state.name)].filter(i => i).join(', ')}</p>
      }

      <p className={st.header_contact}>
        {!isLawyer && <span><Icon name="letter" /><a href={`http://${user.email}`} target="_blank" without="true" rel="noopener noreferrer">{user.email}</a></span> }

        { user.phone && <span><Icon name="phone" />{user.phone}</span> }

        {( isLawyer && user.site ) && <span><Icon name="globe" /><a href={`${user.site}`} target="_blank" without="true" rel="noopener noreferrer">website</a></span> }
      </p>
    </div>
  );
};

export default HeaderProfile;