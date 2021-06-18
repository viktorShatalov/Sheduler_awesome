import axios from 'axios';
import Qs from 'qs';

import URLs from 'setts/urls';

export const searchLawyer = (params) => {
  const { url, method } = URLs.web.searchLawyer;

  // return Promise.resolve({data: {data:[],meta:{total:0,per_page:15}}});

  return axios({
    url,
    method,
    params,
    paramsSerializer(params) {
      return Qs.stringify(params, { arrayFormat: 'brackets', encode: false })
    },
  });
};

export const searchLawyersPin = (params) => {
  const { url, method } = URLs.web.searchLawyersPin;

  // return Promise.resolve({data: {data:[],meta:{total:0,per_page:15}}});

  return axios({
    url,
    method,
    params,
    paramsSerializer(params) {
      return Qs.stringify(params, { arrayFormat: 'brackets', encode: false })
    },
  });
};

export const getAutocompleteLawyers = (params) => {
  const { url, method } = URLs.web.lawyerAutocomplete;

  return axios({
    url,
    method,
    params: {q: params},
    paramsSerializer(params) {
      return Qs.stringify(params, { arrayFormat: 'brackets', encode: false })
    },
  });
};

export const getAutocompleteOccupations = (params) => {
  const { url, method } = URLs.ref.occupationAutocomplete;
  
  return axios({
    url,
    method,
    params: {q: params},
    paramsSerializer(params) {
      return Qs.stringify(params, { arrayFormat: 'brackets', encode: false })
    },
  });
};

export const getLawyerProfile = (slug) => {
  const { url, method } = URLs.web.getLawyerProfile(slug);

  return axios({
    url,
    method,
  });
};

export const getLawyerInfo = (slug) => {
  const { url, method } = URLs.web.getLawyerInfo(slug);

  return axios({
    url,
    method,
  });
};

export const getLawyerCompany = (slug) => {
  const { url, method } = URLs.web.getLawyerCompany(slug);

  return axios({
    url,
    method,
  });
};

export const getLawyerService = (slug) => {
  const { url, method } = URLs.web.getLawyerService(slug);

  return axios({
    url,
    method,
  });
};

export const getLawyerLicense = (slug) => {
  const { url, method } = URLs.web.getLawyerLicense(slug);

  return axios({
    url,
    method,
  });
};

export const getLawyerSchedules = ({ slug, date_start, date_end }) => {
  const { url, method } = URLs.web.getLawyerSchedules(slug);

  return axios({
    url,
    method,
    params: {
      date_end,
      date_start
    }
  });
};

export const getLawyersGroupSchedules = ({ lawyer_ids, date_start, date_end }) => {
  const { url, method } = URLs.web.getLawyersGroupSchedules;

  return axios({
    url,
    method,
    params: {
      date_end,
      date_start,
      lawyer_ids
    }
  });
};
