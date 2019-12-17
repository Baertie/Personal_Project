import {
  AUTHENTICATE,
  LOGOUT,
  SET_USERS,
  CREATE_USER
} from "../actions/authAction";
import User from "../../models/user";

const initialState = {
  token: null,
  userId: null,
  users: [],
  user: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        users: action.users,
        user: action.user
      };
    case CREATE_USER:
      const nieuweUser = new User(
        action.userData.id,
        action.userData.ownerId,
        action.userData.firstName,
        action.userData.LastName
      );
      return {
        ...state,
        users: state.users.concat(nieuweUser),
        user: state.user.concat(nieuweUser)
      };
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
