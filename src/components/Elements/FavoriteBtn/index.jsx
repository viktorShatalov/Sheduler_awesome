import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import st from './favoriteBtn.module.scss';
import qs from 'query-string';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'redux-store/actions';

import Icon from 'components/UI/Icon';

import {CheckUserAuth} from 'helpers/auth';

const FavoriteBtn = ({className, lawyer, favorites, storeFavorite}) => {
  const [ isFavorite, setFavorite ] = useState(!!favorites.find(item => item.lawyer.id === lawyer.id));
  const history = useHistory();

  useEffect(() => {
    setFavorite(!!favorites.find(item => item.lawyer.id === lawyer.id));
  }, [favorites]);

  const saveFavorite = () => {
    if (CheckUserAuth('user')) {
      storeFavorite(lawyer.id);
    } else {
      history.push({
        pathname: '/user/sign-in',
        search: qs.stringify({action: 'favorite', slug: lawyer.slug, path: window.location.pathname})
      })
    }
  }

  return (
    <>
      {/* TODO: only for user */}
      {!CheckUserAuth('lawyer') &&
        (isFavorite ? (
          <span className={classnames(st.saved, className)}>Saved</span>
        ) : (
          <button
            type="button"
            className={classnames(st.save, className)}
            onClick={saveFavorite}
          >
            <Icon name="bookmark" />
            Save
          </button>
        ))
      }
    </>
  );
};

const mapStateToProps = ({user}) => ({
  favorites: user.favorites
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  storeFavorite: actions.storeFavorite
}, dispatch);

const mapToProps = connect(mapStateToProps, mapDispatchToProps);

export default mapToProps(FavoriteBtn);