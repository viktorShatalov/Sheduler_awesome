import {
  user
} from 'redux-store/constants';

import {
  getUserFavorites,
  postUserFavorite,
  deleteUserFavorite
} from 'api/user';

export const getFavorites = () => {
  return (dispatch) => {
    return getUserFavorites()
      .then(res => {
        dispatch(saveFavorites(res.data.data));
        return res.data.data;
      });
  }
}

export const storeFavorite = (id) => {
  return (dispatch) => {
    return postUserFavorite(id)
      .then(res => {
        dispatch(addToFavorites(res.data.data));
        return res.data.data;
      })
  }
}

export const deleteFavorite = (id) => {
  return (dispatch) => {
    return deleteUserFavorite(id)
      .then(res => {
        dispatch(removeFromFavorites(id));
        return res.data.data;
      })
  }
}

export const saveFavorites = (data) => ({
  type: user.SAVE_FAVORITES_LIST,
  data
});

export const addToFavorites = (data) => ({
  type: user.ADD_TO_FAVORITES_LIST,
  data
});

export const removeFromFavorites = (id) => ({
  type: user.REMOVE_FROM_FAVORITES_LIST,
  data: id
});