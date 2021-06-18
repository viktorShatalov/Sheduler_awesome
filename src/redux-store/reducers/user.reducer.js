import {
  user
} from '../constants';

const initialState = {
  profile: {
    data: null,
    stateGet: '',
    stateUpdate: '',
    stateRegister: '',
  },
  notifications: [],
  favorites: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case user.SAVE_USER_PROFILE:
      return {
        ...state,
        profile: {
          ...state.profile,
          data: action.data
        }
      };
    case user.SET_STATE_GET_USER_PROFILE_REQUEST:
      return {
        ...state,
        profile: {
          ...state.profile,
          stateGet: action.data
        }
      };
    case user.SET_STATE_UPDATE_USER_PROFILE_REQUEST:
      return {
        ...state,
        profile: {
          ...state.profile,
          stateUpdate: action.data
        }
      };
    case user.SET_STATE_REGISTER_USER_PROFILE_REQUEST:
      return {
        ...state,
        profile: {
          ...state.profile,
          stateRegister: action.data
        }
      }
    case user.SAVE_NOTIFICATIONS_LIST:
      return {
        ...state,
        notifications: action.data
      }
    case user.READ_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(item => item.id !== action.data)
      }
    case user.SAVE_FAVORITES_LIST:
      return {
        ...state,
        favorites: action.data
      }
    case user.ADD_TO_FAVORITES_LIST:
      return {
        ...state,
        favorites: [...state.favorites, action.data]
      }
    case user.REMOVE_FROM_FAVORITES_LIST:
      return {
        ...state,
        favorites: state.favorites.filter(item => item.id !== action.data)
      }
    case user.CLEAR_USER_STORE:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;