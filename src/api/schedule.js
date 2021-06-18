import axios from 'axios';
import Qs from 'qs';

import URLs from 'setts/urls';

export const fetchSchedule = (params) => {
  const { url, method } = URLs.lawyer.getSchedule;

  return axios({
    url,
    method,
    params,
    paramsSerializer(params) {
      return Qs.stringify(params, {arrayFormat: 'brackets', encode: false})
    },
  });
}

export const postScheduleItem = (params) => {
  const { url, method } = URLs.lawyer.createScheduleItem;

  return axios({
    url,
    method,
    params,
    paramsSerializer(params) {
      return Qs.stringify(params, {arrayFormat: 'brackets', encode: false})
    },
  });
}

export const putScheduleItem = (id, params) => {
  const { url, method } = URLs.lawyer.updateScheduleItem;

  return axios({
    url: `${url}/${id}`,
    method,
    params,
    paramsSerializer(params) {
      return Qs.stringify(params, {arrayFormat: 'brackets', encode: false})
    },
  });
}

export const deleteScheduleItem = (id) => {
  const { url, method } = URLs.lawyer.removeScheduleItem;

  return axios({
    url: `${url}/${id}`,
    method
  });
}

export const putBookingItem = (id, action) => {
  const { url, method } = URLs.lawyer.bookingItemAction;

  return axios({
    url: `${url}/${id}/${action}`,
    method
  })
}