import {
  ref
} from '../../constants';

import {
  fetchFee,
  fetchOccupation,
  fetchState,
  fetchLanguage,
  fetchPayment,
  fetchGender,
  fetchStatus,
  fetchType,
  fetchCountry,
} from 'api/ref';

export const getFeeRetainer = () => {
  return (dispatch, getState) => {
    const {ref} = getState();

    if (ref.fee.length > 0)
    return new Promise((res, rej) => res(ref.fee));

    return fetchFee()
      .then(res => res && dispatch(saveFeeRetainer(res.data)));
  }
};

export const saveFeeRetainer = ({ data }) => ({
  type: ref.SAVE_FEE_RETAINER,
  data,
});

export const getOccupations = () => {
  return (dispatch, getState) => {
    const {ref} = getState();

    if (ref.occupation.length > 0)
    return new Promise((res, rej) => res(ref.occupation));

    return fetchOccupation()
      .then(res => res && dispatch(saveOccupation(res.data)));
  }
};

export const saveOccupation = ({ data }) => ({
  type: ref.SAVE_OCCUPATION,
  data,
});

export const getState = () => {
  return (dispatch, getState) => {
    const {ref} = getState();

    if (ref.state.length > 0)
    return new Promise((res, rej) => res(ref.state));

    return fetchState()
      .then(res => dispatch(saveState(res.data)));
  }
};

export const saveState = ({ data }) => ({
  type: ref.SAVE_STATE,
  data,
});

export const getLanguage = () => {
  return (dispatch, getState) => {
    const {ref} = getState();

    if (ref.language.length > 0) return new Promise((res, rej) => res(ref.language));

    return fetchLanguage()
      .then(res => res && dispatch(saveLanguage(res.data)));
  }
};

export const saveLanguage = ({ data }) => ({
  type: ref.SAVE_LANGUAGE,
  data,
});

export const getPayment = () => {
  return (dispatch, getState) => {
    const {ref} = getState();

    if (ref.payment.length > 0) return new Promise((res, rej) => res(ref.payment));

    return fetchPayment()
      .then(res => res && dispatch(savePayment(res.data)));
  }
};

export const savePayment = ({ data }) => ({
  type: ref.SAVE_PAYMENT,
  data,
});

export const getGender = () => {
  return (dispatch, getState) => {
    const {ref} = getState();

    if (ref.gender.length > 0) return new Promise((res, rej) => res(ref.gender));

    return fetchGender()
      .then(res => res && dispatch(saveGender(res.data)));
  }
};

export const saveGender = ({ data }) => ({
  type: ref.SAVE_GENDER,
  data,
});

export const getStatus = () => {
  return (dispatch, getState) => {
    const {ref} = getState();

    if (ref.status.length > 0) return new Promise((res, rej) => res(ref.status));

    return fetchStatus()
      .then(res => res && dispatch(saveStatus(res.data)));
  }
};

export const saveStatus = ({ data }) => ({
  type: ref.SAVE_STATUS,
  data,
});

export const getType = () => {
  return (dispatch, getState) => {
    const {ref} = getState();

    if (ref.type.length > 0) return new Promise((res, rej) => res(ref.type));

    return fetchType()
      .then(res => res && dispatch(saveType(res.data)));
  }
};

export const saveType = ({ data }) => ({
  type: ref.SAVE_TYPE,
  data,
});

export const getCountry = () => {
  return (dispatch, getState) => {
    const {ref} = getState();

    if (ref.country.length > 0) return new Promise((res, rej) => res({data: ref.country}));

    return fetchCountry()
      .then(res => res && dispatch(saveCountry(res.data)));
  }
};

export const saveCountry = ({ data }) => ({
  type: ref.SAVE_COUNTRY,
  data,
});