const SET_ADMIN = 'SET_ADMIN';
const LOGOUT = 'LOGOUT';

const defaultState = {
  isAdmin: false,
  adminEmail: ''
};

export default function AdminReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_ADMIN:
      return {
        ...state,
        isAdmin: true,
        adminEmail: action.admin
      }
    case LOGOUT:
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('adminEmail');
      return {
        ...state,
        isAdmin: false,
        adminEmail: ''
      };
    default:
      return state
  }
}

export const setAdmin = admin => ({type: SET_ADMIN, admin});

export const logoutAdmin = () => ({type: LOGOUT});