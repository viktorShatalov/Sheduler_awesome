import {
  lawyer
} from 'redux-store/constants';

import {
  getLawyerNotifications,
  postLawyerNotification,
  postAllLawyerNotifications
} from 'api/lawyer';

export const getLawyerNotifs = () => {
  return (dispatch) => {
    return getLawyerNotifications()
      .then(res => {
        dispatch(saveLawyerNotifs(res.data.data.filter(item => !item.read_at)));
        // dispatch(saveNotifications(res.data.data));
        return res.data.data;
      });
  }
}

export const readLawyerNotif = (id) => {
  return (dispatch) => {
    return postLawyerNotification(id)
      .then(res => {
        dispatch(removeLawyerNotif(id));
        return res;
      })
  }
}

export const readAllLawyerNotifs = () => {
  return (dispatch) => {
    return postAllLawyerNotifications()
      .then(res => {
        dispatch(saveLawyerNotifs([]));
        return res;
      })
  }
}

export const saveLawyerNotifs = (data) => ({
  type: lawyer.SAVE_NOTIFICATIONS_LIST,
  data
});

export const removeLawyerNotif = (data) => ({
  type: lawyer.READ_NOTIFICATION,
  data
})