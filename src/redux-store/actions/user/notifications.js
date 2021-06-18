import {
  user
} from 'redux-store/constants';

import {
  getUserNotifications,
  postUserNotification,
  postAllNotifications
} from 'api/user';

export const getUserNotifs = () => {
  return (dispatch) => {
    return getUserNotifications()
      .then(res => {
        dispatch(saveUserNotifs(res.data.data.filter(item => !item.read_at)));
        // dispatch(saveNotifications(res.data.data));
        return res.data.data;
      });
  }
}

export const readUserNotif = (id) => {
  return (dispatch) => {
    return postUserNotification(id)
      .then(res => {
        dispatch(removeUserNotif(id));
        return res;
      })
  }
}

export const readAllUserNotifs = () => {
  return (dispatch) => {
    return postAllNotifications()
      .then(res => {
        dispatch(saveUserNotifs([]));
        return res;
      })
  }
}

export const saveUserNotifs = (data) => ({
  type: user.SAVE_NOTIFICATIONS_LIST,
  data
});

export const removeUserNotif = (data) => ({
  type: user.READ_NOTIFICATION,
  data
})