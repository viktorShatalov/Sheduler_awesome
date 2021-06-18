import React, { Fragment } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Icon from 'components/UI/Icon';
import st from './account.module.scss';

import imgPlaceholder from 'assets/img/image-placeholder.svg';

const AuthAccountItem = ({ item, children }) => {
  const fullName = `${item.first_name} ${item.last_name}`;
  const address = Object.values(item.address).filter(i => i).join(', ');

  return (
    <Fragment>
      <div className={st.container}>
        <p className={st.avatar}>
          <LazyLoadImage
            alt={fullName}
            src={item.avatar || imgPlaceholder}
            effect="blur"
            // beforeLoad={e => console.log(e)}
            placeholderSrc={imgPlaceholder}
          />
        </p>

        <div className={st.textData}>
          <p className={st.name}>{fullName}</p>
          <p className={st.address}><Icon name="pin" /><span>{address}</span></p>
          <p className={st.email}><Icon name="letter" /><span>{item.email}</span></p>
        </div>

        <p className={st.btn}>
          { children }
        </p>
      </div>
    </Fragment>
  );
};

export default AuthAccountItem;