import { TYPES } from "../types/type";
export const AuthReducerLogin = (state = {}, action) => {
  switch (action.type) {
    case TYPES.login:
      return {
        tokens: action.payload.tokens,
        AuthUser: action.payload.AuthUser,
      };

    case TYPES.logout:
      return {};

    default:
      return state;
  }
};
