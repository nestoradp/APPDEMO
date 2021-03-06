import { TYPES } from "../types/type";

export const RequestDataReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.SalveRequestCreate:
      return {
        id: action.payload.id,
        StatusCode: action.payload.StatusCode,
      };

    case TYPES.RemoveRequestCreate:
      return {};

    default:
      return state;
  }
};
