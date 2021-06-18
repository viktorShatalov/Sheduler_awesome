import {
  user
} from 'redux-store/constants';

import {
  fetchProfile,
  updateProfile,
  updateAvatar
} from 'api/user';

export const getUserProfile = () => {
  return (dispatch, getState) => {
    dispatch(setStateRequestGetProfile({data: 'pending'}));

    const {user} = getState();

    if (user.profile.data) {
      dispatch(setStateRequestGetProfile({data: 'success'}));
      return new Promise((res, rej) => res(user.profile));
    }

    return fetchProfile()
      .then(res => {
        if(res) {
          dispatch(saveUserProfile(res.data));
          dispatch(setStateRequestGetProfile({data: 'success'}));

          return res.data;
        }
      });
  }
};

export const updateUserAvatar = (avatar) => {
  return (dispatch, getState) => {
    return updateAvatar(avatar)
      .then(({data}) => {
        if(data) {
          dispatch(saveUserProfile(data));

          return data;
        }
      })
      // .catch((err) => {
      //   dispatch(setStateRequestUpdateProfile({data: 'error'}));
      // })
  }
};

export const updateUserProfile = (data) => {
  return (dispatch, getState) => {
    dispatch(setStateRequestUpdateProfile({data: 'pending'}));

    return updateProfile(data)
      .then(res => {
        if(res) {
          dispatch(saveUserProfile(res.data));
          dispatch(setStateRequestUpdateProfile({data: 'success'}));

          return res.data;
        }
      })
      .catch((err) => {
        dispatch(setStateRequestUpdateProfile({data: 'error'}));
      })
  }
};

export const saveUserProfile = ({ data }) => ({
  type: user.SAVE_USER_PROFILE,
  data,
});

export const setStateRequestGetProfile = ({ data }) => ({
  type: user.SET_STATE_GET_USER_PROFILE_REQUEST,
  data,
});

export const setStateRequestUpdateProfile = ({ data }) => ({
  type: user.SET_STATE_UPDATE_USER_PROFILE_REQUEST,
  data,
});
