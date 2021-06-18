import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import useOutsideClick from 'hooks/useOutsideClick';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from 'redux-store/actions';

import Icon from 'components/UI/Icon';
import st from './favorites.module.scss';

import FavoriteItem from 'components/Elements/FavoriteItem';

const Favorites = ({isMobile, favItems, getFavorites, deleteFavorite}) => {
  const [ favorites, setFavorites ] = useState(favItems);
  const [ isOpen, setOpen ] = useState(false);

  useEffect(() => {
    getFavorites();
  }, []);

  useEffect(() => {
    setFavorites(favItems);
    
    if (!favItems.length)
      setOpen(false);
  }, [favItems]);

  const wrap = React.useRef(null);

  useOutsideClick(wrap, () => setOpen(false));

  const cancelFavorite = (id) => {
    deleteFavorite(id);
  }

  return (
    <div className={classnames(st.container, {
      [st.empty]: favorites.length === 0
    })}>
      <React.Fragment>
        {
          isMobile ?
          <Link
            className={st.icon}
            to={'/favorites'}
          >
            <Icon name="header-bookmark"/>
          </Link>
          :
          <span
            className={st.icon}
            onClick={() => setOpen(true)}
          >
            <Icon
              name="header-bookmark"
            />
          </span>
        }
        

        <CSSTransition
          in={isOpen}
          classNames="show"
          timeout={{
            enter: 400,
            exit: 200
          }}
          unmountOnExit
        >
          <div className={st.popup} ref={wrap}>
            {favorites.map(i => 
              <FavoriteItem
                key={i.id}
                favorite={i}
                onCancel={cancelFavorite}
              />
            )}
          </div>
        </CSSTransition>
      </React.Fragment>
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