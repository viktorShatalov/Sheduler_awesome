import {
  ref
} from '../constants';

import eventsType from 'moks/eventsTypes';

const initialState = {
  fee: [],
  occupation: [],
  state: [],
  language: [],
  payment: [],
  gender: [],
  status: [],
  type: [],
  country: [],
};

const refReducer = (state = initialState, action) => {
  switch (action.type) {
    case ref.SAVE_FEE_RETAINER:
      return {
        ...state,
        fee: action.data
      };
    case ref.SAVE_OCCUPATION:
        return {
          ...state,
          occupation: action.data
        };
    case ref.SAVE_STATE:
        return {
          ...state,
          state: action.data
        };
    case ref.SAVE_LANGUAGE:
        return {
          ...state,
          language: action.data
        };
    case ref.SAVE_PAYMENT:
        return {
          ...state,
          payment: action.data
        };
    case ref.SAVE_GENDER:
        return {
          ...state,
          gender: action.data
        };
    case ref.SAVE_STATUS:
      return {
        ...state,
        status: action.data
      };
    case ref.SAVE_TYPE:
      return {
        ...state,
        type: action.data
          // TODO: убрали событие live meeting
          .filter(i => i.id !== 3)
          // ---------------------
          .map(i => ({
          ...i,
          icon: eventsType.find(type => type.id === i.id) && eventsType.find(type => type.id === i.id).icon,
          sort: eventsType.find(type => type.id === i.id) && eventsType.find(type => type.id === i.id).sort })).sort((a, b) => a.sort - b.sort)
      };
    case ref.SAVE_COUNTRY:
      return {
        ...state,
        country: action.data
      };
    default:
      return state;
  }
};

export default refReducer;