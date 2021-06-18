import {
  lawyer
} from '../../constants';

const initialState = {
  searchFromDatabase: [],
  profile: {
    data: {
      info: null,
      company: null,
      service: null,
      license: null,
    },
    stateGet: '',
    stateUpdate: ''
  },
  notifications: []
};

const lawyerReducer = (state = initialState, action) => {
  switch (action.type) {
    case lawyer.SAVE_LAWYER_PROFILE:
      return {
        ...state,
        profile: {
          ...state.profile,
          data: {
            ...state.profile.data,
            info: action.data
          }
        }
      };
    case lawyer.UPDATE_LAWYER_INFO:
      return {
        ...state,
        profile: {
          ...state.profile,
          data: {
            ...state.profile.data,
            info: action.data
          }
        }
      };
    case lawyer.SAVE_LAWYER_FROM_DATABASE:
      return {
        ...state,
        searchFromDatabase: action.data
      };
    case lawyer.SET_STATE_GET_LAWYER_PROFILE_REQUEST:
      return {
        ...state,
        profile: {
          ...state.profile,
          stateGet: action.data
        }
      };
    case lawyer.SET_STATE_UPDATE_LAWYER_PROFILE_REQUEST:
      return {
        ...state,
        profile: {
          ...state.profile,
          stateUpdate: action.data
        }
      };
    case lawyer.SAVE_COMPANY:
      return {
        ...state,
        profile: {
          ...state.profile,
          data: {
            ...state.profile.data,
            company: action.data
          }
        }
      };
    case lawyer.SAVE_SERVICE:
      return {
        ...state,
        profile: {
          ...state.profile,
          data: {
            ...state.profile.data,
            service: action.data
          }
        }
      };
    case lawyer.SAVE_LICENSE:
      return {
        ...state,
        profile: {
          ...state.profile,
          data: {
            ...state.profile.data,
            license: action.data
          }
        }
      };
    case lawyer.SAVE_NOTIFICATIONS_LIST:
      return {
        ...state,
        notifications: action.data
      }
    case lawyer.READ_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(item => item.id !== action.data)
      }
    default:
      return state;
  }
};

export default lawyerReducer;