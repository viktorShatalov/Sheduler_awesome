import {
  lawyer
} from '../../constants';

import status from 'setts/requestStates';

import {
  create,
  list,
  update,
  destroy,
} from 'api/company';

export const createCompany = (data) => {
  return (dispatch) => {
    return create(data)
      .then(res => {
        // dispatch(saveLawyerProfile(res.data));
        // dispatch(setStateRequestGetProfile({data: status.success}));

        return res.data;
      })
  }
}

export const getListAddress = (id) => {
  return (dispatch) => {
    return list({id})
      .then(res => {
        // dispatch(saveLawyerProfile(res.data));
        // dispatch(setStateRequestGetProfile({data: status.success}));

        return res.data;
      })
  }
}

export const updateAddress = (data) => {
  return (dispatch) => {
    return update(data);
  }
}

export const deleteAddress = (id) => {
  return (dispatch) => {
    return destroy({id});
  }
}

// export const saveCompany = ({ data }) => ({
//   type: lawyer.SAVE_COMPANY,
//   data,
// });
