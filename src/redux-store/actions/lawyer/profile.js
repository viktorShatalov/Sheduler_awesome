import {
  lawyer
} from '../../constants';

import status from 'setts/requestStates';

import {
  create,
  searchInDatabase,
  verificationSend,

  updateProfile,
  updateAvatar,
  updateService,
  storeService,
  updateLicense,
  updateCompany,
  updatePassword,
  toggleVisible,

  fetchProfile,
  fetchService,
  fetchLicense,
  fetchCompany,
} from 'api/lawyer';

export const createLawyer = (data) => {
  return (dispatch) => {
    return create(data)
      .then(res => {
        // dispatch(saveLawyerProfile(res.data));
        // dispatch(setStateRequestGetProfile({data: status.success}));

        return res.data;
      })
  }
}

export const searchLawyerInDatabase = (data) => {
  return (dispatch) => {
    return searchInDatabase(data)
      .then(res => {
        dispatch(saveLawyerFromDatabase(res.data));
        return res.data;
      })
  }
}

export const verificationLawyerSend = (data) => {
  return () => {
    return verificationSend(data)
      .then(res => {
        return res.data;
      })
  }
}

export const getLawyerProfile = () => {
  return (dispatch, getState) => {
    dispatch(setStateRequestGetProfile({data: status.pending}));

    const {lawyer} = getState();

    if (lawyer.profile.data.info) {
      dispatch(setStateRequestGetProfile({data: status.success}));
      return new Promise((res, rej) => res(lawyer.profile.data.info));
    }

    return fetchProfile()
      .then(res => {
        if(res) {
          dispatch(saveLawyerProfile(res.data));
          dispatch(setStateRequestGetProfile({data: status.success}));

          return res.data;
        }
      })
      // .catch((err) => Promise.reject(err));
  }
};

export const updateLawyerAvatar = (avatar) => {
  return (dispatch) => {
    return updateAvatar(avatar)
      .then(({data}) => {
        dispatch(updateLawyerInfo(data));
      })
  }
};

export const toggleVisibleInSearch = (data) => {
  return (dispatch) => {
    return toggleVisible(data);
  }
};

export const updateLawyerPassword = (data) => {
  return (dispatch) => {
    return updatePassword(data);
  }
};

export const updateLawyerService = (data) => {
  return (dispatch) => {
    return updateService(data);
  }
};

export const storeLawyerService = (data) => {
  return (dispatch) => {
    return storeService(data);
  }
};

export const updateLawyerLicense = (data) => {
  return (dispatch) => {
    return updateLicense(data);
  }
};

export const updateLawyerCompany = (data) => {
  return (dispatch) => {
    return updateCompany(data);
  }
};

export const updateLawyerProfile = (data) => {
  return (dispatch, getState) => {
    dispatch(setStateRequestUpdateProfile({data: status.pending}));

    return updateProfile(data)
      .then(({data}) => {
        if(data) {
          // dispatch(saveLawyerProfile(res.data));
          dispatch(setStateRequestUpdateProfile({data: status.success}));
          dispatch(updateLawyerInfo(data));
          return data;
        }
      })
      .catch((err) => {
          // dispatch(setStateRequestUpdateProfile({data: status.success}));
          dispatch(setStateRequestUpdateProfile({data: status.error}));
          return Promise.reject(err);
      })
  }
};

export const getService = () => {
  return (dispatch) => {
    return fetchService()
      .then(res => {
        // dispatch(saveService(res.data));
        // dispatch(setStateRequestGetProfile({data: status.success}));

        return res.data;
      })
  }
}

export const getLicense = () => {
  return (dispatch) => {
    return fetchLicense()
      .then(res => {
        // dispatch(saveLicense(res.data));

        return res.data;
      })
  }
}

export const getCompany = () => {
  return (dispatch) => {
    return fetchCompany()
      .then(res => {
        // dispatch(saveCompany(res.data));
        // dispatch(setStateRequestGetProfile({data: status.success}));

        return res.data;
      })
  }
}

export const saveLawyerProfile = ({ data }) => ({
  type: lawyer.SAVE_LAWYER_PROFILE,
  data,
});

export const setStateRequestGetProfile = ({ data }) => ({
  type: lawyer.SET_STATE_GET_LAWYER_PROFILE_REQUEST,
  data,
});

export const setStateRequestUpdateProfile = ({ data }) => ({
  type: lawyer.SET_STATE_UPDATE_LAWYER_PROFILE_REQUEST,
  data,
});

export const updateLawyerInfo = ({ data }) => ({
  type: lawyer.UPDATE_LAWYER_INFO,
  data,
});

export const saveLawyerFromDatabase = ({ data }) => ({
  type: lawyer.SAVE_LAWYER_FROM_DATABASE,
  data,
});
