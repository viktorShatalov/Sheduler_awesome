import axios from 'axios';

import URLs from 'setts/urls';

export const getSEOCity = () => {
  const { url, method } = URLs.seo.getCity;

  return axios({
    url,
    method,
  });
};
