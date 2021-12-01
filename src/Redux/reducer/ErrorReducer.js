import { TYPES } from "../types/type";

const initialState = {
  status: null,
  loading: false,
  msgError: null,
};

export const UIReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case TYPES.UISetError:
      return {
        ...state,
        msgError: action.payload.message,
        status: action.payload.status
      };
    case TYPES.UIRemoveError:
      return {
        ...state,
        msgError: null,
      };

    case TYPES.uiStartLoading:
      return {
        ...state,
        loading: true,
      };

    case TYPES.uiFinishLoading:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
