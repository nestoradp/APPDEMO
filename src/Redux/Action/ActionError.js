import { TYPES } from "../types/type";

const setError = (message, status) => ({
  type: TYPES.UISetError,
  payload: {
    message,
    status
  },
});

const removeError = () => ({
  type: TYPES.UIRemoveError,
});

const startLoading = () => ({
  type: TYPES.uiStartLoading,
});

const finishLoading = () => ({
  type: TYPES.uiFinishLoading,
});
export { setError, removeError, startLoading, finishLoading };
