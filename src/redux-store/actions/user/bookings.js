import {
  getUserBookings,
  putCancelBooking
} from 'api/user';

export const getBookings = (params) => {
  return (dispatch) => {
    return getUserBookings(params)
      .then(res => {
        return res.data.data;
      });
  }
}

export const cancelBooking = (id) => {
  return (dispatch) => {
    return putCancelBooking(id)
      .then(res => {
        return res;
      })
  }
}