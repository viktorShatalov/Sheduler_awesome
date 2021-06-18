import {
  lawyer
} from '../../constants';

import status from 'setts/requestStates';

import * as actions from './profile';
// import { saveLawyerProfile } from './profile';

import {
  login,
  logout,
  resetPass,
  sendEmailToResetPass
} from 'api/lawyer';

export const loginLawyer = (data) => {
  return (dispatch) => {
    return login(data);
  }
}

export const logoutLawyer = () => {
  return (dispatch) => {
    return logout()
      .then(() => 
        dispatch(actions.saveLawyerProfile({data: null}))
      );
  }
}

export const resetLawyerPassword = (data) => {
  return (dispatch) => {
    return resetPass(data);
  }
}

export const sendToResetLawyerPassword = (data) => {
  return (dispatch) => {
    return sendEmailToResetPass(data);
  }
}
