import axios from 'axios';
import URLs from 'setts/urls';
import Qs from 'qs';

export const login = (data) => {
  const { url, method } = URLs.user.token;

  return axios({ url, method, data })
    .then(({ data }) => {
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

export const sendEmailToResetPass = (data) => {
  const { url, method } = URLs.user.emailToPasswordReset;

  return axios({ url, method, data });
}

export const resetPass = (data) => {
  const { url, method } = URLs.user.passwordReset;

  return axios({ url, method, data });
}

export const fetchProfile = () => {
  const { url, method } = URLs.user.getProfile;

  return axios({ url, method })
    .catch(err => {
      if (err.response.status === 401) {
        delete axios.defaults.headers.common["Authorization"];
        localStorage.removeItem('token');
        localStorage.removeItem('mode');
      }
      return Promise.reject(err.response);
    })
}

export const updateProfile = (data) => {
  const { url, method } = URLs.user.updateProfile;

  console.log(data);

  return axios({ url, method, data });
}

export const updateAvatar = (data) => {
  const { url, method } = URLs.user.updateAvatar;

  console.log(data);

  return axios({ url, method, data });
}

export const registerUser = (data) => {
  const { url, method } = URLs.user.registerUser;

  return axios({ url, method, data });
}
// 
export const registerVidgetUser = (data) => {
  const { url, method } = URLs.user.registerUser;

  return axios({ url, method, data });
}
// 
export const bookingScheduleUser = ({ id, data }) => {
  const { url, method } = URLs.user.bookingSchedule(id);

  return axios({ url, method, data });
}

export const getUserBookings = (params) => {
  const { url, method } = URLs.user.getUserBookings;

  return axios({
    url,
    method,
    params,
    paramsSerializer(params) {
      return Qs.stringify(params, { arrayFormat: 'brackets', encode: false })
    },
  })
}

export const putCancelBooking = (id) => {
  const { url, method } = URLs.user.putCancelBooking;

  return axios({
    url: `${url}/${id}/cancel`,
    method
  });
}

export const getUserNotifications = () => {
  const { url, method } = URLs.user.getUserNotifications;

  return axios({
    url,
    method
  });
}

export const postUserNotification = (id) => {
  const { url, method } = URLs.user.postUserNotification;

  return axios({
    url: `${url}/${id}`,
    method
  });
}

export const postAllNotifications = () => {
  const { url, method } = URLs.user.postAllNotifications;

  return axios({
    url,
    method
  });
}

export const getUserFavorites = () => {
  const { url, method } = URLs.user.getUserFavorites;

  return axios({
    url,
    method
  });
}

export const postUserFavorite = (id) => {
  const { url, method } = URLs.user.postUserFavorite;

  return axios({
    url,
    method,
    params: {
      lawyer_id: id
    }
  });
}

export const deleteUserFavorite = (id) => {
  const { url, method } = URLs.user.deleteUserFavorite;

  return axios({
    url: `${url}/${id}`,
    method
  })
}