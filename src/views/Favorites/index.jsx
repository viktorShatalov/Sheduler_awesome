import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'redux-store/actions';

import FavoriteItem from 'components/Elements/FavoriteItem';
import st from './favorites.module.scss';


const Favorites = ({favItems, getFavorites, deleteFavorite}) => {
  const [ favorites, setFavorites ] = useState([]);

  useEffect(() => {
    getFavorites();
  }, []);

  useEffect(() => {
    setFavorites(favItems);
  }, [favItems]);

  const cancelFavorite = (id) => {
    deleteFavorite(id);
  };

  useEffect(() => {
    document.querySelector('.esq-main').classList.add('esq-white-bg');

    return () => {
      document.querySelector('.esq-main').classList.remove('esq-white-bg');
    }
  });


  return (
    <div className={st.container}>
      <div className="esq-wrap">
        {
          favorites.length > 0 ? (
            <div className={st.list}>
              {favorites.map(i => 
                <FavoriteItem
                  key={i.id}
                  favorite={i}
                  onCancel={cancelFavorite}
                />
              )}
            </div>
          ) : (
            <div className={st.empty}>
              <p>List is empty.</p>

              <Link
                to={'/'}
                className={classnames('esq-btn', st.link)}
              ><span>Go to Main</span></Link>
            </div>
          )
        }
      </div>
    </div>
  );
};

const mapStateToProps = ({user}) => ({
  favItems: user.favorites
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getFavorites: actions.getFavorites,
  deleteFavorite: actions.deleteFavorite
}, dispatch);

const mapToProps = connect(mapStateToProps, mapDispatchToProps);

export default mapToProps(Favorites);