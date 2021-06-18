import {
  user
} from '../../constants';

import status from 'setts/requestStates';

import {
  login,
  logout,
  resetPass,
  sendEmailToResetPass
} from 'api/user';


export const loginUser = (data) => {
  return (dispatch) => {
    return login(data);
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(clearUserStore());
    return logout();
  }
}

export const resetUserPassword = (data) => {
  return (dispatch) => {
    return resetPass(data);
  }
}

export const sendToResetUserPassword = (data) => {
  return (dispatch) => {
    return sendEmailToResetPass(data);
  }
}

export const clearUserStore = () => ({
  type: user.CLEAR_USER_STORE
});