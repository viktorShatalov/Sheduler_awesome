import axios from 'axios';
import URLs from 'setts/urls';

export const create = ({id, data}) => {
  const { url, method } = URLs.company.create(id);

  return axios({url, method, data});
}

export const list = ({id}) => {
  const { url, method } = URLs.company.list(id);

  return axios({url, method});
}

export const update = ({id, data}) => {
  const { url, method } = URLs.company.update(id);

  return axios({url, method, data});
}

export const destroy = ({id}) => {
  const { url, method } = URLs.company.destroy(id);

  return axios({url, method});
}

