import { TYPES } from "../types/type";
import { SendDataLogin } from "../../Axios/AuthLogin";
import { finishLoading, startLoading, setError } from "./ActionError";

export const AuthRequestLogin = (username, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    SendDataLogin(username, password)
      .then((data) => {
        dispatch(finishLoading());
        dispatch(finishLoading());
        const tokens = data.data.tokens;
        const AutUser = data.data.data;
        dispatch(AuhtSalveUserlogin(tokens, AutUser));
      })
      .catch((error) => {
        dispatch(finishLoading());
        const { message } = JSON.parse(error.request.response);
        dispatch(setError(message));
      });
  };
};

export const AuhtSalveUserlogin = (tokens, AuthUser) => ({
  type: TYPES.login,
  payload: {
    tokens,
    AuthUser,
  },
});
