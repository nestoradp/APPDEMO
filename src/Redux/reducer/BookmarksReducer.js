import { TYPES } from "../types/type";

export const BookmarksReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.ListBookmarks:
      return {
        ListBookmarks: action.payload.ListBookmarks,
      };

    default:
      return state;
  }
};
