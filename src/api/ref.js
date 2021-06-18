import axios from 'axios';
import URLs from 'setts/urls';

export const fetchFee = () => {
  const { url, method } = URLs.ref.getFee;

  return axios({url, method});
}

export const fetchOccupation = () => {
  const { url, method } = URLs.ref.getOccupation;

  return axios({url, method});
}

export const fetchLanguage = () => {
  const { url, method } = URLs.ref.getLanguage;

  return axios({url, method});
}

export const fetchState = () => {
  const { url, method } = URLs.ref.getState;

  return axios({url, method});
}

export const fetchPayment = () => {
  const { url, method } = URLs.ref.getPayment;

  return axios({url, method});
}

export const fetchGender = () => {
  const { url, method } = URLs.ref.getGender;

  return axios({url, method});
}

export const fetchStatus = () => {
  const { url, method } = URLs.ref.getStatus;

  return axios({url, method});
}

export const fetchType = () => {
  const { url, method } = URLs.ref.getType;

  return axios({url, method});
}

export const fetchCountry = () => {
  const { url, method } = URLs.ref.getCountry;

  return axios({url, method});
}