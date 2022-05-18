const SET_USER = 'SET_USER';
const UPDATE_USER = 'UPDATE_USER';
const LOGOUT = 'LOGOUT';

const defaultState = {
  isAuth: false,
  currentUser: {}
};

export default function UserReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuth: true,
        currentUser: action.user
      };
    case UPDATE_USER:
      return {
        ...state,
        currentUser: action.user
      }
    case LOGOUT:
      localStorage.removeItem('isAuth');
      localStorage.removeItem('currentUser');
      return {
        ...state,
        isAuth: false,
        currentUser: {}
      };
    default:
      return state
  }
}

export const setUser = user => ({type: SET_USER, user});

export const updateUser = user => ({type: UPDATE_USER, user});

export const logout = () => ({type: LOGOUT});