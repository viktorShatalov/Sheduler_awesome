import {
  lawyer
} from '../../constants';

import {
  fetchSchedule,
  postScheduleItem,
  putScheduleItem,
  deleteScheduleItem,
  putBookingItem
} from 'api/schedule';

import SchedulerHelper from 'helpers/formatScheduleData';

export const getSchedule = (data) => {
  return (dispatch) => {
    return fetchSchedule(SchedulerHelper.toApi(data))
      .then(res => {
        return res.data.data.map(item => SchedulerHelper.fromApi(item));
      })
  }
}

export const createScheduleItem = (data) => {
  return dispatch => {
    return postScheduleItem(SchedulerHelper.toApi(data))
      .then(res => {
        return SchedulerHelper.fromApi(res.data.data);
      })
  }
}

export const updateScheduleItem = (id, data) => {
  return dispatch => {
    return putScheduleItem(id, SchedulerHelper.toApi(data))
      .then(res => {
        return SchedulerHelper.fromApi(res.data.data);
      })
  }
}

export const removeScheduleItem = (id) => {
  return dispatch => {
    return deleteScheduleItem(id)
      .then(res => {
        return res;
      })
  }
}

export const acceptBookingItem = (id) => {
  return dispatch => {
    return putBookingItem(id, 'accept')
      .then(res => {
        return res;
      })
  }
}

export const cancelBookingItem = (id) => {
  return dispatch => {
    return putBookingItem(id, 'cancel')
      .then(res => {
        return res;
      })
  }
}