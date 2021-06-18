import {
  user
} from 'redux-store/constants';

import {
  registerUser,
  registerVidgetUser
} from 'api/user';

export const registerUserProfile = (data) => {
  return (dispatch, getState) => {
    dispatch(setStateRequestRegisterProfile({ data: 'pending' }));

    return registerUser(data)
      .then(res => {
        console.log('res', res);
        dispatch(saveUserProfile(res.data));
        dispatch(setStateRequestRegisterProfile({ data: 'success' }));
        return res.data;
      })
    // TEMP add reject
    // .catch(err => {
    //   console.log('error', err.response);
    //   dispatch(setStateRequestRegisterProfile({data: 'error'}));
    // });
  }
}
export const registerVidgetUserProfile = (data) => {
  return (dispatch, getState) => {
    dispatch(setStateRequestRegisterProfile({ data: 'pending' }));

    return registerVidgetUser(data)
      .then(res => {
        console.log('res', res);
        dispatch(saveUserProfile(res.data));
        dispatch(setStateRequestRegisterProfile({ data: 'success' }));
        return res.data;
      })
    // TEMP add reject
    // .catch(err => {
    //   console.log('error', err.response);
    //   dispatch(setStateRequestRegisterProfile({data: 'error'}));
    // });
  }
}

export const saveUserProfile = ({ data }) => ({
  type: user.SAVE_USER_PROFILE,
  data,
});

export const setStateRequestRegisterProfile = ({ data }) => ({
  type: user.SET_STATE_REGISTER_USER_PROFILE_REQUEST,
  data,
})