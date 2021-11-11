import{TYPES} from "../types/type";

const setError = (error) => ({
    type: TYPES.UISetError,
    payload: error,
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