import axios from 'axios';
import Qs from 'qs';

import URLs from 'setts/urls';

// const apiClient = axios.create({
//   baseURL: URLs.BASE_PROD,
//   withCredentials: true,
//   headers: {
//     'Accept': 'application/json',
//     'XSRF-TOKEN': '',
//     'Referer': 'localhost',
//     'X-Requested-With': 'XMLHttpRequest'
//   }
// });
// // X-XSRF-TOKEN
// export const login = (data) => {
//   const { url, method } = URLs.lawyer.login;

//   return apiClient.get('/sanctum/csrf-cookie')
//     .then(response => {
//       apiClient({url, method, data});
//     });
// }

export const login = (data) => {
  const { url, method } = URLs.lawyer.token;

  return axios({url, method, data})
    .then(({data}) => {
      const token = `${data.token_type} ${data.token}`;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = token;
    });
}

export const logout = () => {
  // const { url, method } = URLs.lawyer.logout;

  delete axios.defaults.headers.common["Authorization"];
  localStorage.removeItem('token');
  localStorage.removeItem('mode');

  return new Promise((res, rej) => res());

  // return axios({url, method});
}

export const create = (data) => {
  const { url, method } = URLs.lawyer.create;

  return axios({url, method, data});
}

export const searchInDatabase = (params) => {
  const { url, method } = URLs.lawyer.searchInDatabase;

  return axios({url, method, 
    params,
    paramsSerializer(params) {
      return Qs.stringify(params, {arrayFormat: 'brackets'})
    },
  });
}

export const verificationSend = (data) => {
  const { url, method } = URLs.lawyer.verificationSend;

  return axios({url, method, data});
}

export const sendEmailToResetPass = (data) => {
  const { url, method } = URLs.lawyer.emailToPasswordReset;

  return axios({url, method, data});
}

export const resetPass = (data) => {
  const { url, method } = URLs.lawyer.passwordReset;

  return axios({url, method, data});
}

export const fetchProfile = () => {
  const { url, method } = URLs.lawyer.getProfile;

  return axios({url, method})
    .catch(err => {
      if (err.response.status === 401) {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem('token');
        localStorage.removeItem('mode');
      }
      return Promise.reject(err.response);
    })
  ;
}

export const fetchCompany = () => {
  const { url, method } = URLs.lawyer.company;

  return axios({url, method});
}

export const updateProfile = (data) => {
  const { url, method } = URLs.lawyer.updateProfile;

  return axios({url, method, data});
}

export const toggleVisible = (data) => {
  const { url, method } = URLs.lawyer.toggleVisible;

  return axios({url, method, data});
}

export const updatePassword = (data) => {
  const { url, method } = URLs.lawyer.updatePassword;

  return axios({url, method, data});
}

export const updateLicense = (data) => {
  const { url, method } = URLs.lawyer.updateLicense;

  return axios({url, method, data});
}

export const updateCompany = (data) => {
  const { url, method } = URLs.lawyer.updateCompany;

  return axios({url, method, data});
}

export const updateAvatar = (data) => {
  const { url, method } = URLs.lawyer.updateAvatar;

  return axios({url, method, data});
}

export const storeService = (data) => {
  const { url, method } = URLs.lawyer.storeService;

  return axios({url, method, data});
}

export const updateService = (data) => {
  const { url, method } = URLs.lawyer.updateService;

  return axios({url, method, data});
}

export const fetchService = () => {
  const { url, method } = URLs.lawyer.service;

  return axios({url, method});
};

export const fetchLicense = () => {
  const { url, method } = URLs.lawyer.license;

  return axios({url, method});
};

export const getLawyerNotifications = () => {
  const {url, method} = URLs.lawyer.getLawyerNotifications;

  return axios({
    url,
    method
  });
}

export const postLawyerNotification = (id) => {
  const {url, method} = URLs.lawyer.postLawyerNotification;

  return axios({
    url: `${url}/${id}`,
    method
  });
}

export const postAllLawyerNotifications = () => {
  const {url, method} = URLs.lawyer.postAllLawyerNotifications;

  return axios({
    url,
    method
  });
}
